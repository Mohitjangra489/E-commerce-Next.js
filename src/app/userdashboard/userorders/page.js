'use client';
import React, { useEffect } from 'react'
import axios from 'axios';
import api from '../../apiMiddleware';

const Page = () => {

  useEffect(()=>{
    const  getTransactions=async()=>{
      let res= await api.get('/stripetransactionslist').then((data)=>{
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
