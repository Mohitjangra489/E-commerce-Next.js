"use client";
import React, { useEffect, useState } from 'react'
import api from '@/app/apiMiddleware';
import encryptStorage from '@/app/encryptstorage';
import '../admin_allorders/adminallorders.css';
import SpinnerLoader from '@/app/components/SpinnerLoader';

const Page = () => {
  const [allorders, setallorders] = useState([]);
  const [isloading, setisLoading] = useState(true);

  async function fetchallorders() {

    let req = await api.get(`/allorders`).then((res) => {
      console.log(res.data);
      setallorders(res?.data);
      setisLoading(false);

    }).catch((error => console.log(error)));
  };


  useEffect(() => {
    const securedata = encryptStorage.getItem("encrypted data");
    const userData = JSON.parse(securedata);

    if (!userData) {
      router.push("/login");
    }
    else {
      fetchallorders();
    }
  }, [])

  return (isloading) ? <SpinnerLoader /> : (
    <>
      {
        allorders.length ?
          <div className='products_maindiv_container'>
            <div className='total_products_div'>
              <h1>All Orders List</h1>
            </div>
            <div className='products_container'>
              <div style={{ padding: "13px" }}>
                <h1>{allorders.length + " Orders"}</h1>
              </div>
              <table className='product_table'>
                <tbody>
                  <tr className='heading_tr'>
                    <th>Sr.no</th>
                    <th>Order_Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                  {
                    allorders.map((order, index) => {
                      return (
                        <tr key={order._id}  >
                          <td>{index + 1}.</td>
                          <td>{order._id}</td>
                          <td>{order.name}</td>
                          <td>{order.email}</td>
                          <td>₹{Math.floor(Number(order?.subtotal / 100))}</td>
                          <td> {order?.createdAt?.slice(0, 10)}</td>
                          <td>Paid</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div> : <>
            <div>
              <div className='zero_order_div'>
                <span className='listorder_span'>All Orders List</span><br></br>
                <span style={{fontSize:"2.5rem",color:"grey",letterSpacing:'2px'}}>No Order present in the Database!🐧</span>
              </div>
            </div>

          </>
      }
    </>


  )
}

export default Page
