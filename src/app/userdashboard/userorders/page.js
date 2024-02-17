'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from '../../apiMiddleware';
import '../userorders/userorders.css';
import encryptStorage from '@/app/encryptstorage';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SpinnerLoader from '@/app/components/SpinnerLoader';


const Page = () => {
  const [allorders, setallorders] = useState([]);
  const [isloading, setisLoading] = useState(true);

  const router = useRouter();

  async function fetchalluserorders(id) {
    let userid = id;
    let req = await api.get(`/userorders?userid=${userid}`).then((res) => {
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
      fetchalluserorders(userData.user_id);
    }
  }, [])


  return (
    <div className='orderpage_container'>
      <span style={{ fontSize: "6rem" }}>Your Orders</span>
      <Link href="/" style={{ color: "grey" }}>Continue shopping...</Link>
     

      {
        isloading ? <SpinnerLoader /> : (
          <>
            { 
            allorders.length==0 ? <span style={{fontSize:"2.5rem",color:"grey",letterSpacing:'2px'}}> You have not ordered anything yet!🦉</span> : (allorders?.map((order) => {
              return (
                <div className='orderdiv_container' key={order._id}>
                  <div className='upper1_div'>
                    <div className='orderid'>
                      <span className='orderid_span'>ORDER ID:{order._id}</span>
                      <span className='paid_span'>Paid👍</span>
                    </div>
                    <div className='orderdate'>
                      <span> Order date: {order?.createdAt?.slice(0, 10)}</span>
                      {/* <span> 🚚Estimated delivery: Feb 19,2024</span> */}
                    </div>

                  </div>
                  <div className='upper2_div'>
                    {order?.line_items?.map((item, index) => {
                      return (
                        <div className='upper2div_div' key={item.id}>
                          <div className='orderdetail_div'>
                            <span style={{ fontWeight: "700" }}>{index + 1}.{item?.description}</span>
                            <span>Per piece: ₹{Math.floor(Number(item?.price?.unit_amount / 100))}</span>
                          </div>
                          <div className='orderdetail_div'>
                            <span>₹{Math.floor(Number(item?.amount_total / 100))}</span>
                            <span>Qty:{item?.quantity}</span>
                          </div>
                        </div>
                      )
                    })}
                    <div className='subtotal_div'>
                      <span style={{ color: "green", fontWeight: "700", borderTop: "1px solid black", borderBottom: "1px solid black" }}>Subtotal: ₹{Math.floor(Number(order?.subtotal / 100))}</span>
                    </div>
                  </div>
                  <div className='upper3_div'>
                    <span style={{ fontSize: "3rem" }}>Delivery Address</span><br></br>
                    <span>{order?.address[0]?.fullname + " ( " + order?.address[0]?.mobile + " )"}</span><br></br>
                    <span>{order?.address[0]?.address1}</span><br></br>
                    <span>{order?.address[0]?.address2}</span><br></br>
                    <span>{order?.address[0]?.landmark}</span><br></br>
                    <span>{order?.address[0]?.country + "," + order?.address[0]?.city + "," + order?.address[0]?.state + "," + order?.address[0]?.pincode}</span><br></br>
                  </div>
                </div>
              )
            }))
            }
          </>

        )}

    </div>

  )
}

export default Page
