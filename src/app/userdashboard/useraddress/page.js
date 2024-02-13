"use client";
import React, { useEffect, useState } from 'react'
import "../useraddress/useraddress.css";
import { ImLocation2 } from "react-icons/im";
import Link from 'next/link';
import api from '../../apiMiddleware';
import SpinnerLoader from '@/app/components/SpinnerLoader';
import encryptStorage from '../../encryptstorage';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [allAddress, setallAddress] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const router =useRouter();

  async function fetchalluseraddress(id) {
    let userid = id;
    let req = await api.get(`/alluseraddress?id=${userid}`).then((res) => {
      const data = res?.data?.addresses;
      setallAddress(data);
      setisLoading(false);

    }).catch((error => console.log(error)));
  };

  useEffect(() => {

    const securedata = encryptStorage.getItem("encrypted data");
            const userData=JSON.parse(securedata);
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
        isloading ? <SpinnerLoader /> : (
          <>
            { 
              allAddress==[] || allAddress==undefined ? <span>You have not added any address!</span> : (allAddress?.map((address) => {
                return (
                  <div className='address_div_div' key={address?.address_id} >
                    <div className='left_address_div'>
                      <ImLocation2 className='location_icon' />
                    </div>
                    <div className='right_address_div'>
                      <span>{address?.fullname + " ( " + address?.mobile + " )"}</span><br></br>
                      <span>{address?.address1}</span><br></br>
                      <span>{address?.address2}</span><br></br>
                      <span>{address?.landmark}</span><br></br>
                      <span>{address?.country + "," + address?.city + "," + address?.state + "," + address?.pincode}</span><br></br>
                    </div>
                  </div>
                )
              }))
            }
          </>
        )
      }

      <div>
        <Link href={"/userdashboard/useraddress/addnewaddress"} ><button className='addnewaddress_btn'> + Add New Address</button></Link>
        <Link href={"/userdashboard"} ><button className='addnewaddress_btn'> ← Go Back</button></Link>
      </div>

    </div>
  )
}

export default Page
