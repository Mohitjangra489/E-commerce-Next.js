"use client";
import React, { useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import '../success/success.css'
const Page = () => {

   
     const clearcart=async(id)=>{
        let req = await axios.post(`http://localhost:8000/clearcart?id=${id}`).catch((error => console.log(error)));
     }

    useEffect(()=>{
        let userData = JSON.parse(localStorage.getItem("UserData"));
        if (!userData) {
            router.push("/login");
        }
        else {
           let id=userData.user_id;
            clearcart(id);
        }
    
    },[])
    return (
        <div className='success_main_container'>

            <div className='gif_div'>
                <img className='image_gif' src='https://webnail.com.ua/wp-content/uploads/2020/09/happystate.gif' />
            </div>
            <div  className='lower_span_div'>
                        <span style={{fontSize:"6rem"}} >Payment successfull !</span>
                        <span>Thank you for your payment, we have recieved your payment.</span><br></br>
                       <Link href="/" style={{color:"grey",cursor:"pointer"}}>Continue shopping...</Link> 
                        
            </div>
        </div>
    )
}

export default Page
