import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import BaseComponent from '../components/BaseComponent'
import { GetAllPreviousOrders } from '../services/Order-Cart-Service';
import UserContext from '../context/UserContext';
import { CustomDateFormatterFunc, PRODUCT_IMAGE_BASE_URL } from '../services/Helper';

function Orders() {
console.log("orders.js rendered")
const [orders,setOrders]=useState([]);
const { userContextState } = useContext(UserContext);
useEffect(()=>{
    console.log("Inside useEffect of Orders.js")
    GetAllPreviousOrders(userContextState.cid).then((result) => {
        console.log(result.data);
        setOrders([...result.data.reverse()]);
    }).catch((err) => {
        console.log(err);
    });
},[])

const DisplayOrders = orders.map((item) => {
    return (
      <tr key={item.orderid}>
        <th scope="row">{item.orderid}</th>
        <td>
          <img alt="Sample" src={PRODUCT_IMAGE_BASE_URL+item.product.productimage} height={"50px"} width={"50px"} />
        </td>
        <td>{item.product.name}</td>
        <td>{item.product.category.categoryname}</td>
        <td>RS.{item.product.price}</td>
        <td>{CustomDateFormatterFunc(item.orderdate)}</td>
        <td>{item.address}</td>
        <td>{item.paymenttype}</td>
      </tr>
    );
  });

  return (
    <BaseComponent>
        <div className="container-fluid " style={{minHeight:"500px"}}>
            <h2 className='text-center text-primary'>PREVIOUS ORDERS</h2>
                <Table striped>
                  <thead>
                    <tr>
                      <th>ORDER-ID</th>
                      <th>PRODUCT-IMAGE</th>
                      <th>PRODUCT-NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>ORDER-DATE</th>
                      <th>SHIPPING ADDRESS</th>
                      <th>PAYMENT TYPE</th>
                    </tr>
                  </thead>
                  <tbody>{DisplayOrders}</tbody>
                </Table>
        </div>
    </BaseComponent>
  )
}

export default Orders