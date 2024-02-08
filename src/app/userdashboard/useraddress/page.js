"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../useraddress/useraddress.css";
import { ImLocation2 } from "react-icons/im";
import Link from 'next/link';

const Page = () => {
  const [allAddress,setallAddress]=useState([]);

  async function fetchalluseraddress(id) {
    let userid = id;
    let req = await axios.get(`http://localhost:8000/alluseraddress?id=${userid}`).then((res) => {
        const data = res?.data?.addresses;
        console.log(data);
        setallAddress(data);

    }).catch((error => console.log(error)));
};

useEffect(() => {

    let userData = JSON.parse(localStorage.getItem("UserData"));
    if (!userData) {
        router.push("/login");
    }
    else {
      fetchalluseraddress(userData.user_id);
    }

}, [])
  return (
    <div className='address_maindiv_container' >
      <div className='div1'>
     <span > Your Addresses</span>
      </div>

      {
        allAddress?.map((address)=>{
             return(
              <div className='address_div_div'key={address?.address_id} >
              <div className='left_address_div'>
               <ImLocation2 className='location_icon' />
              </div>
              <div className='right_address_div'>
                <span>{address?.fullname +" ( "+ address?.mobile +" )" }</span><br></br>
                <span>{address?.address1}</span><br></br>
                <span>{address?.address2}</span><br></br>
                <span>{address?.landmark}</span><br></br>
                <span>{address?.country +","+ address?.city + "," + address?.state + "," +address?.pincode }</span><br></br>
              </div>
            </div>
             )
        })
      }
      <div>
       <Link href={"/userdashboard/useraddress/addnewaddress"} ><button className='addnewaddress_btn'> + Add New Address</button></Link> 
       <Link href={"/userdashboard"} ><button className='addnewaddress_btn'> ← Go Back</button></Link> 
      </div>
     
    </div>
  )
}

export default Page
