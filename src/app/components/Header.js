'use client';
import React, { useContext, useEffect, useState } from 'react';
import '../styles/header.css';
import { TiShoppingCart } from "react-icons/ti";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaUserCircle } from "react-icons/lia";
import { FaUser } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import SearchContext from './Context';
import encryptStorage from '../encryptstorage';

const Header = () => {
  const [isLogged, setisLogged] = useState(false);
  const [searchValue, setsearchValue] = useContext(SearchContext);
  const router = useRouter();

  const handleLogout = () => {
    encryptStorage.removeItem("encrypted data");
    setisLogged(false);
    router.push('/login');
  }

  useEffect(() => {
    let userdata =encryptStorage.getItem("encrypted data");
    if (userdata) {
      setisLogged(true);
    }
    else {
      setisLogged(false);
    }
  });
  return (
    <div className='header_container'>

      <div className='header_logo_div'>
        <Link href="/"> <img src="https://cdn.staticans.com/image/catalog/optimum/logo/396-2023_02_23-optimum_nutrition_logo.png" alt='logo' title='Home'></img></Link>

      </div>
      <div className='search_div'>
        <input type='text' placeholder='Enter your keyword' list='search_product' className='search' value={searchValue} onChange={(e) => { setsearchValue(e.target.value) }}></input>
        <datalist id='search_product'>
          <option value="Whey Protein"></option>
          <option value="Weight Gainer"></option>
          <option value="Creatine"></option>
          <option value="Amino Energy"></option>
          <option value="BCAA"></option>
          <option value="Glutamine"></option>
          <option value="Pre Workout"></option>
          <option value="Isopure"></option>
          <option value="Serious Mass"></option>
        </datalist>
        <BsSearch className='searchbar-icon' />
      </div>
      <div className='header_right_container'>
        <div className='header_button_div'>
          {
             isLogged ?<Link href="/cart"> <TiShoppingCart fill='white' className='react-icons' title='Cart' /></Link>
             :<Link href="/login"> <TiShoppingCart fill='white' className='react-icons' title='Cart' /></Link>

          }
          {
            !isLogged ? (<Link href={"/login"}><VscSignIn fill='white' className='react-icons' title='Login' /></Link>)
              : (<VscSignOut fill='white' className='react-icons' title='Logout' onClick={handleLogout} />)
          }

        </div>
        <div className='header_user_details_div'>
          {
            isLogged ? (<Link href="/userdashboard"><FaUser fill="#b59461" className='react-icons' title=' User Dashboard' /> </Link>) :
              (<Link href={"/login"}><LiaUserCircle className='react-icons' title=' User Dashboard' /></Link>)
          }

        </div>
      </div>
    </div>
  )
}

export default Header
