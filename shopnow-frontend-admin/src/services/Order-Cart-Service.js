import { myaxios } from "./Helper";

export const GetAllOrders=()=>{
    return myaxios.get(`/oms/orders`);
}

