
import { myaxios } from "./Helper";

export const FetchAllCategories=()=>{
    return myaxios.get("/pms/categories");
}

