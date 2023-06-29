
import { myaxios } from "./Helper";

export const GetAllCustomers=()=>{
    return myaxios.get("/cms/customers");
}

export const RegisterCustomer=(customerdata)=>{
    return myaxios.post("/cms/customers",customerdata);
}

export const LoginCustomer=(customerdata)=>{
    return myaxios.post("/cms/login",customerdata);
}

export const UpdateCustomerDetailsById=(customerid,customerdata)=>{
    return myaxios.put(`/cms/customers/${customerid}`,customerdata);
}