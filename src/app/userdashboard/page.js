"use client"
import React, { useEffect, useState } from 'react'
import '../userdashboard/userdashboard.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImLocation2 } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { GiHouseKeys } from "react-icons/gi";
import { BsDatabaseFill,BsDatabaseFillAdd } from "react-icons/bs";
import { PiUserListFill } from "react-icons/pi";
import { PiCodesandboxLogoFill } from "react-icons/pi";
import encryptStorage from '../encryptstorage'



const Page = () => {
  const [user, setuser] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const securedata = encryptStorage.getItem("encrypted data");
    const userData=JSON.parse(securedata);
    if (!userData) {
      encryptStorage.removeItem("encrypted data");
      router.push("/");
    }
    else {
      if(userData?.role=="Admin")
      {
     setisAdmin(true);
      }
      else{
        setisAdmin(false);
      }
      setuser(userData);
    }
  }, [])

  return (
    <div className='profile_container'>
      <div className='profile_details'>
        <div>
          <img src='https://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png'
            className='user_image'
          />
          <span className='username_span'>{user.username}</span>
        </div>
        {/* <div>
          <button className='edit_profile_btn'>Edit Profile</button>
        </div> */}

      </div>
      <div className='profile_lower_div'>
        <Link href="/userdashboard/userorders" className='user_links'>
          <div className='profile_lower_div_divs'>
            <img src="https://cdn.staticans.com/temp/ans-myaccount/order.png" className='all_icons' />
            My Orders
          </div>
        </Link>

        <Link href="/userdashboard/useraddress" className='user_links'>
          <div className='profile_lower_div_divs'>
            <ImLocation2 className='all_icons' />
            My Addresses
          </div>
        </Link>

        <Link href="/userdashboard/updateprofile" className='user_links'>
          <div className='profile_lower_div_divs'>
            <FaUserEdit className='all_icons' />
            Edit Profile
          </div>
        </Link>

        <Link href="/userdashboard/updatepassword" className='user_links'>
          <div className='profile_lower_div_divs'>
            <GiHouseKeys className='all_icons' />
            Change Password
          </div>
        </Link>
{
  isAdmin &&(
    <>
      <Link href="/userdashboard/admin_newproduct" className='user_links'>
          <div className='profile_lower_div_divs'>
            <BsDatabaseFillAdd className='all_icons' />
            Add New Product <span className='admin_span'>(Admin)</span>
          </div>
        </Link>
        <Link href="/userdashboard/admin_allproducts" className='user_links'>
          <div className='profile_lower_div_divs'>
            <BsDatabaseFill className='all_icons' />
            All Products<span className='admin_span'>(Admin)</span>
          </div>
        </Link>

        <Link href="/userdashboard/admin_allorders" className='user_links'>
          <div className='profile_lower_div_divs'>
            <PiCodesandboxLogoFill className='all_icons' />
            All Orders<span className='admin_span'>(Admin)</span>
          </div>
        </Link>

        <Link href="/userdashboard/admin_allusers" className='user_links'>
          <div className='profile_lower_div_divs'>
            <PiUserListFill className='all_icons' />
            All Users<span className='admin_span'>(Admin)</span>
          </div>
        </Link>
    </>

  )
}
      

      </div>
    </div>
  )
}

export default Page
