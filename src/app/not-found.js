"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import './styles/notfound.css';

const Notfound = () => {
    const router=useRouter();
  return (
    <div className='notfound_maindiv'>
        <h4>404</h4>
        <p className='para1_notfound'>page not found</p>
        <p className='para2_notfound'> We are sorry, the page you have looked for does not exist in our database!</p>
        <button onClick={()=>router.push("/")} className='goback_btn'>Go Back To Home Page</button>
    </div>
  )
}

export default Notfound
