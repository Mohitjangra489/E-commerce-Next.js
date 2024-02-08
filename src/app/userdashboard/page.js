"use client"
import React, { useEffect, useState } from 'react'
import '../userdashboard/userdashboard.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImLocation2 } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { GiHouseKeys } from "react-icons/gi";


const Page = () => {
  const [user, setuser] = useState("");
  const router = useRouter();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("UserData"));
    if (!userData) {
      localStorage.removeItem("UserData");
      router.push("/");
    }
    else {
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
          <span style={{ color: "black", fontSize: "2.5rem" }}>{user.username}</span>
        </div>
        <div>
          <button className='edit_profile_btn'>Edit Profile</button>
        </div>

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


      </div>
    </div>
  )
}

export default Page
