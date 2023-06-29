import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddNewProduct } from "../services/Product-Service";

function AddProductForm(props) {
  console.log("addproductform.js rendered");
  const navigate = useNavigate();
  const [stateData, setStateData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryid: 0,
  });

  const [productImageData, setProductImageData] = useState(null);
  const handleFileChange = (event) => {
    //console.log(event.target.files[0]);
    setProductImageData(event.target.files[0]);
  };

  const handleChange = (event) => {
    //console.log(stateData);
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(stateData);
    //console.log(productImageData)
    try {
      const response = await AddNewProduct(stateData, productImageData);
      //console.log(response.data);
      setProductImageData(null);
      setStateData({
        name: "",
        description: "",
        price: 0,
        categoryid: 0,
      });
      toast.success("New Product Added Successfully !!");
      props.FetchCategoriesAndProducts(props.categoryname,props.categoryid);
    } catch (error) {
      toast.error("Something Went Wrong While Adding New Product !!");
    }
  };

  return (
    <div className="AddProduct container" style={{ minHeight: "500px" }}>
      <Card
        className="my-2 shadow rounded-0"
        style={{ backgroundColor: "rgb(255,255,255,1)" }}
      >
        <CardHeader>
          <h2 className="text-primary" style={{ textAlign: "center" }}>
            ADD NEW PRODUCT
          </h2>
        </CardHeader>
        <CardBody>
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Product Name</Label>
                <Input
                  className="rounded-0"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  value={stateData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Product Description</Label>
                <Input
                  className="rounded-0"
                  id="description"
                  name="description"
                  placeholder="Enter Description"
                  type="text"
                  value={stateData.description}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Product Price</Label>
                <Input
                  className="rounded-0"
                  id="price"
                  name="price"
                  placeholder="Enter Price"
                  type="number"
                  value={stateData.price || ""}
                  min={99}
                  max={99999}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="productimage">Select Product Image</Label>
                <Input
                  className="rounded-0"
                  id="productimage"
                  name="productimage"
                  type="file"
                  onChange={handleFileChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="categoryid">Select Category</Label>
                <Input
                  id="categoryid"
                  name="categoryid"
                  type="select"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Choose From Below..
                  </option>
                  {props.categories.map((category) => (
                    <option
                      key={category.categoryid}
                      value={category.categoryid}
                    >
                      {category.categoryname}
                    </option>
                  ))}
                  ;
                </Input>
              </FormGroup>
              <div className="container text-center">
                <Button className="btn btn-sm" color="primary">
                  Add Product
                </Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddProductForm;
