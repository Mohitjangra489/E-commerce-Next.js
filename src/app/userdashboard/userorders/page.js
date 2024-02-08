'use client';
import React, { useEffect } from 'react'
import axios from 'axios';

const Page = () => {

  useEffect(()=>{
    const  getTransactions=async()=>{
      let res= await axios.get('http://localhost:8000/stripetransactionslist').then((data)=>{
    console.log("stripe transactions",data);
      });
    }

    getTransactions();
  },[])

  return (
    <div>
      user orders
    </div>
  )
}

export default Page
