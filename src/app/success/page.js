"use client";
import React, { useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import '../success/success.css'
import api from '../apiMiddleware';
import encryptStorage from '../encryptstorage';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const Page = () => {
 const router=useRouter();
 const searchParams = useSearchParams()
 const session_id = searchParams.get('session_ID');
 console.log(session_id);


 
     const handlesuccess=async(id)=>{
        if(!session_id){
            router.push("/");
         }
        let req = await api.post(`/paymentsuccess?session_id=${session_id}&user_id=${id}`).catch((error => console.log(error)));
     }

    useEffect(()=>{
        const securedata = encryptStorage.getItem("encrypted data");
            const userData=JSON.parse(securedata);
        if (!userData) {
            router.push("/login");
        }
        else {
           let id=userData.user_id;
           
           handlesuccess(id);
        }
    
    },[])
    return (
        <div className='success_main_container'>

            <div className='gif_div'>
                <img className='image_gif' src='https://webnail.com.ua/wp-content/uploads/2020/09/happystate.gif' />
            </div>
            <div  className='lower_span_div'>
                        <span  className='payment_successful_span' >Payment successfull !</span>
                        <span>Thank you for your payment, we have recieved your payment.</span><br></br>
                       <Link href="/" style={{color:"grey",cursor:"pointer"}}>Continue shopping...</Link> 
                        
            </div>
        </div>
    )
}

export default Page
