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
import { AddNewCategory } from "../services/Category-Service";

function AddCategoryForm(props) {
  console.log("addcategoryform.js rendered");

  const [stateData, setStateData] = useState({
    categoryname: "",
    categorydescription: "",
  });

  const handleChange = (event) => {
    //console.log(stateData);
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(stateData);
    try {
      const response = await AddNewCategory(stateData);
      //console.log(response.data);
      toast.success("New Category Added Successfully !!");
      setStateData({
        categoryname: "",
        categorydescription: "",
      });
      props.FetchCategories();
    } catch (error) {
      toast.error("Something Went Wrong While Adding New Category !!");
    }
  };

  return (
    <div className="AddCategory container" style={{ minHeight: "500px" }}>
      <Card
        className="my-2 shadow rounded-0"
        style={{ backgroundColor: "rgb(255,255,255,1)" }}
      >
        <CardHeader>
          <h2 className="text-primary" style={{ textAlign: "center" }}>
            ADD NEW CATEGORY
          </h2>
        </CardHeader>
        <CardBody>
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="categoryname">Category Name</Label>
                <Input
                  className="rounded-0"
                  id="categoryname"
                  name="categoryname"
                  placeholder="Enter Name"
                  type="text"
                  value={stateData.categoryname}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Category Description</Label>
                <Input
                  className="rounded-0"
                  id="categorydescription"
                  name="categorydescription"
                  placeholder="Enter Description"
                  type="text"
                  value={stateData.categorydescription}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div className="container text-center">
                <Button className="btn btn-sm" color="primary">
                  Add Category
                </Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddCategoryForm;
