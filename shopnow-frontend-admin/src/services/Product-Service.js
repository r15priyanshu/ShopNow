import { myaxios } from "./Helper";
export const FetchAllProductsByCategoryId=(categoryid)=>{
    return myaxios.get(`/pms/products/category/${categoryid}`);
}

export const FetchAllProducts=()=>{
    return myaxios.get(`/pms/products`);
}

export const AddNewProduct=(productdata,imagedata)=>{
    const formdata = new FormData();
    formdata.append("product", JSON.stringify(productdata));
    formdata.append("productimage", imagedata);
    return myaxios.post(`/pms/products/category/${productdata.categoryid}`,formdata);
}

export const DeleteProductByProductId=(productid)=>{
    return myaxios.delete(`/pms/products/${productid}`);
}

