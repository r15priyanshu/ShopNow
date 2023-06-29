import React, { useEffect, useState  } from "react";
import BaseComponent from "../components/BaseComponent";
import {
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import { FetchAllCategories } from "../services/Category-Service";
import { FetchAllProductsByCategoryId } from "../services/Product-Service";
import { useParams } from "react-router-dom";
import ProductView from "../components/ProductView";
function Products() {
  console.log("products.js rendered");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { categoryname, categoryid } = useParams();
  

  //to load all the categories from the database
  useEffect(() => {
    FetchAllCategories()
      .then((result) => {
        console.log(result.data);
        setCategories([...result.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(categoryid);
    FetchAllProductsByCategoryId(categoryid)
      .then((result) => {
        console.log(result.data);
        setProducts([...result.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryname]);

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

  return (
    <BaseComponent>
      <div className="Products" style={{minHeight:"500px"}}>
        <Nav pills className="Category-Container m-1 p-1 border">
          <NavItem>
            <NavLink tag={ReactRouterNavLink} to={"/products/category/0/ALL"}>
              ALL
            </NavLink>
          </NavItem>
          {showcategories}
        </Nav>
        <div className="Products-Container container">
          <div className="row">
            {products && products.reverse().map((product) => {
              return (
                <div className="col-md-4 mt-3 justify-content-center" key={product.pid}>
                  <ProductView product={product}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Products;
