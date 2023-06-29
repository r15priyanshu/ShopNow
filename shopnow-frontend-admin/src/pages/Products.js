import React, { useEffect, useState } from "react";
import BaseComponent from "../components/BaseComponent";
import { Button, Nav, NavItem, NavLink, Table } from "reactstrap";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import { FetchAllCategories } from "../services/Category-Service";
import {
  DeleteProductByProductId,
  FetchAllProductsByCategoryId,
} from "../services/Product-Service";
import { useParams } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import { PRODUCT_IMAGE_BASE_URL } from "../services/Helper";
import { toast } from "react-toastify";
function Products() {
  console.log("products.js rendered");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { categoryname, categoryid } = useParams();

  //to load all the categories from the database
  useEffect(() => {
    FetchCategoriesAndProducts(categoryname, categoryid);
  }, [categoryname, categoryid]);

  const FetchCategoriesAndProducts = async (categoryname, categoryid) => {
    try {
      const response1 = await FetchAllCategories();
      const response2 = await FetchAllProductsByCategoryId(categoryid);
      console.log(response1.data);
      console.log(response2.data);
      setCategories([...response1.data]);
      setProducts([...response2.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDelete = (productid) => {
    //console.log(productid);
    DeleteProductByProductId(productid)
      .then((result) => {
        toast.success("Product Successfully Deleted !!");
        FetchCategoriesAndProducts(categoryname,categoryid);
      })
      .catch((err) => {
        toast.error("Something Went Wrong While Deleting Product !!");
      });
  };

  const showcategories = categories.map((category) => {
    return (
      <NavItem key={category.categoryid}>
        <NavLink
          tag={ReactRouterNavLink}
          to={`/products/category/${category.categoryid}/${category.categoryname}`}
        >
          {category.categoryname}
        </NavLink>
      </NavItem>
    );
  });

  const DisplayProducts = products.reverse().map((item) => {
    return (
      <tr key={item.pid}>
        <th scope="row">{item.pid}</th>
        <td>
          <img
            alt="Sample"
            src={PRODUCT_IMAGE_BASE_URL + item.productimage}
            height={"50px"}
            width={"50px"}
          />
        </td>
        <td>{item.name}</td>
        <td>{item.category.categoryname}</td>
        <td>RS.{item.price}</td>
        <td>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleProductDelete(item.pid)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <BaseComponent>
      <div className="Products" style={{ minHeight: "500px" }}>
        <Nav pills className="Category-Container m-1 p-1 border">
          <NavItem>
            <NavLink tag={ReactRouterNavLink} to={"/products/category/0/ALL"}>
              ALL
            </NavLink>
          </NavItem>
          {showcategories}
        </Nav>
        <div className="Products-Container container-fluid">
          <div className="row">
            <div className="col-md-4">
              <AddProductForm categories={categories} FetchCategoriesAndProducts={FetchCategoriesAndProducts} categoryname={categoryname} categoryid={categoryid}/>
            </div>
            <div className="col-md-8">
              <h2 className="text-center text-primary">PRODUCTS LIST</h2>
              <Table striped>
                <thead>
                  <tr>
                    <th>PRODUCT-ID</th>
                    <th>PRODUCT-IMAGE</th>
                    <th>PRODUCT-NAME</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>{DisplayProducts}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Products;
