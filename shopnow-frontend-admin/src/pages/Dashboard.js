import React, { useEffect, useState } from 'react'
import BaseComponent from '../components/BaseComponent'
import { GetAllCustomers } from '../services/Customer-Service';
import { FetchAllProducts } from '../services/Product-Service';
import { FetchAllCategories } from '../services/Category-Service';
import { GetAllOrders } from '../services/Order-Cart-Service';

function Dashboard() {

  const [stateData,setStateData]=useState({
    totalcustomerscount:0,
    totalproductscount:0,
    totalcategoriescount:0,
    totalorderscount:0
  })
  
  useEffect(()=>{
    FetchAllData();
  },[])

  const FetchAllData=async ()=>{

    try {
        const response1=await GetAllCustomers();
        const totalcustomerscount=response1.data.length;
        console.log(totalcustomerscount);

        const response2=await FetchAllProducts();
        const totalproductscount=response2.data.length;
        console.log(totalproductscount);

        const response3=await FetchAllCategories();
        const totalcategoriescount=response3.data.length;
        console.log(totalcategoriescount);

        const response4=await GetAllOrders()
        const totalorderscount=response4.data.length;
        console.log(totalorderscount);

        setStateData({
            totalcustomerscount:totalcustomerscount,
            totalproductscount:totalproductscount,
            totalcategoriescount:totalcategoriescount,
            totalorderscount:totalorderscount
          });

    } catch (error) {
        
    }
  }

  return (
    <BaseComponent>
        <div className="Dashboard container" style={{ minHeight: "500px" }}>
        <h2 className='text-center text-primary fw-bold m-3'>SHOP-NOW DASHBOARD</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className='text-center'>
                        <div className='fw-bold'>CUSTOMERS COUNT</div>
                        <div style={{fontSize:"100px",color:"white",backgroundColor:"#A76F6F"}}>{stateData.totalcustomerscount}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='text-center'>
                        <div className='fw-bold'>PRODUCTS COUNT</div>
                        <div style={{fontSize:"100px",color:"white",backgroundColor:"#FFA41B"}}>{stateData.totalproductscount}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='text-center'>
                        <div className='fw-bold'>CATEGORIES COUNT</div>
                        <div style={{fontSize:"100px",color:"white",backgroundColor:"#A7ECEE"}}>{stateData.totalcategoriescount}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='text-center'>
                        <div className='fw-bold'>ORDERS COUNT</div>
                        <div style={{fontSize:"100px",color:"white",backgroundColor:"#D7C0AE"}}>{stateData.totalorderscount}</div>
                    </div>
                </div>
            </div>
        </div>
    </BaseComponent>
  )
}

export default Dashboard