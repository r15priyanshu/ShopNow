import React, { useEffect, useState } from "react";
import BaseComponent from "../components/BaseComponent";
import { Button, Table } from "reactstrap";
import { DeleteCategoryById, FetchAllCategories } from "../services/Category-Service";
import { toast } from "react-toastify";
import AddCategoryForm from "../components/AddCategoryForm";
function Categories() {
  console.log("products.js rendered");
  const [categories, setCategories] = useState([]);

  //to load all the categories from the database
  useEffect(() => {
    FetchCategories();
  }, []);

  const FetchCategories = async () => {
    try {
      const response=await FetchAllCategories();
      //console.log(response.data);
      setCategories([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryDelete = async (categoryid) => {
    //console.log(categoryid);
    try {
      const response=await DeleteCategoryById(categoryid);
      //console.log(response.data);
      toast.success("Category Deleted Successfully !!");
      FetchCategories();
    } catch (error) {
      toast.error("Something Went Wrong While Deleting Category !!");
    }
  };

  const DisplayCategories = categories.reverse().map((category) => {
    return (
      <tr key={category.categoryid}>
        <th scope="row">{category.categoryid}</th>
        <td>{category.categoryname}</td>
        <td>{category.categorydescription}</td>
        <td>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleCategoryDelete(category.categoryid)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <BaseComponent>
      <div className="Categories" style={{ minHeight: "500px" }}>
        <div className="Categories-Container container-fluid">
          <div className="row">
            <div className="col-md-4">
              <AddCategoryForm FetchCategories={FetchCategories}/>
            </div>
            <div className="col-md-8">
              <h2 className="text-center text-primary">CATEGORIES LIST</h2>
              <Table striped>
                <thead>
                  <tr>
                    <th>CATEGORY-ID</th>
                    <th>CATEGORY-NAME</th>
                    <th>CATEGORY-DESCRIPTION</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>{DisplayCategories}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Categories;
