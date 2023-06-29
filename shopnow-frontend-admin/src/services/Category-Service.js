
import { myaxios } from "./Helper";

export const FetchAllCategories=()=>{
    return myaxios.get("/pms/categories");
}

export const AddNewCategory=(categorydata)=>{
    return myaxios.post("/pms/categories",categorydata);
}

export const DeleteCategoryById=(categoryid)=>{
    return myaxios.delete(`/pms/categories/${categoryid}`);
}





