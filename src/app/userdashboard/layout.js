"use client";
import React, { useEffect, useState } from 'react'
import '../userdashboard/userdashboard.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import encryptStorage from '../encryptstorage';

export default function Layout({ children }) {
  const [isAdmin, setisAdmin] = useState(false);
  const pathname = usePathname();
  const router=useRouter();

  useEffect(() => {
    let userData = encryptStorage.getItem("encrypted data");
    
    if (userData) {
      if (userData?.role == "Admin") {
        setisAdmin(true);
      }
    }
    else {
      setisAdmin(false);
    }

  });

  useEffect(()=>{
   if(pathname.includes("/admin_") && isAdmin==false)
   {
    router.push("/userdashboard")
   }
  },[pathname]);

  useEffect(()=>{
   const checkToken=setInterval(() => {
    const data=encryptStorage.getItem("encrypted data");
    if(!data){
      encryptStorage.removeItem("UserData");
      router.push("/");
      
    }
    return ()=>clearInterval(checkToken);
   }, 60*1000);
  },[])


  return (
    <>
      <div className='userdashboard_container'>
        <div className='user_title'>
          {
            pathname.includes("/admin_") && isAdmin==true ? <span className='userrr_dash'>Admin Dashboard</span> : <span className='userrr_dash'>User Dashboard</span>
          }
        </div>
        <div className='user_main_body'>
          <div className='user_left'>
            {
              isAdmin && (
                <>
                  <ul>
                    <Link href="/userdashboard/admin_newproduct"><li>New Product <span className='admin_span'>(Admin)</span></li></Link>
                    <Link href="/userdashboard/admin_allproducts"> <li>All Products <span className='admin_span'>(Admin)</span></li></Link>
                    <Link href="/userdashboard/admin_allorders"> <li>All Orders <span className='admin_span'>(Admin)</span></li></Link>
                    <Link href="/userdashboard/admin_allusers"> <li>All Users <span className='admin_span'>(Admin)</span></li></Link>
                  </ul>
                  <hr></hr>
                </>
              )
            }
            <ul>
              <Link href="/userdashboard/userorders"><li>Orders</li></Link>
              <Link href="/userdashboard/useraddress"><li>Address</li></Link> 
              <Link href="/userdashboard/updatepassword"><li>Change Password</li></Link>
              <Link href="/login"><li style={{ color: "red", fontWeight: "bold" }}>Logout</li></Link>
            </ul>
          </div>
          <div className='user_right'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}