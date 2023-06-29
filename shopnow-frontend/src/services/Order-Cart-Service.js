import { myaxios } from "./Helper";
export const AddProductsToCart=(productid,customerid)=>{
    return myaxios.post(`/oms/carts/product/${productid}/customer/${customerid}`);
}

export const GetAllItemsInCartByCustomerId=(customerid)=>{
    return myaxios.get(`/oms/carts/customer/${customerid}`);
}

export const DeleteItemInCartByCartItemId=(cartitemid)=>{
    return myaxios.delete(`/oms/carts/${cartitemid}`);
}

export const PlaceOrder=(customerid,shippingdetails)=>{
    return myaxios.post(`/oms/orders/customer/${customerid}`,shippingdetails);
}

export const GetAllPreviousOrders=(customerid)=>{
    return myaxios.get(`/oms/orders/customer/${customerid}`);
}

