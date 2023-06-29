import { myaxios } from "./Helper";

export const FetchAllProductsByCategoryId=(categoryid)=>{
    return myaxios.get(`/pms/products/category/${categoryid}`);
}
