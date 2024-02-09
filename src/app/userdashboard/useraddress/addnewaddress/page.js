"use client";
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../addnewaddress/addnewaddress.css';
import Link from 'next/link';
import api from '../../../apiMiddleware';

const Page = () => {
    const [address, setaddress] = useState({});

    const onChange = (e) => {
        setaddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleformsubmit = async (e) => {
        e.preventDefault();
        let userData = JSON.parse(localStorage.getItem("UserData"));
        if(!userData){
          router.push("/");
        }
        else
        { 
            const { fullname, mobile, address1, address2, landmark, pincode, country, city, state } = address;

            if (fullname && mobile && address1 && address2 && landmark && pincode && country && city && state) {
                let formData = {
                    user_id:userData.user_id,
                    fullname,
                    mobile,
                    address1,
                    address2,
                    landmark,
                    pincode,
                    country,
                    city,
                    state
                }
    
                const config = {
                    headers: {
                        "content-Type": "application/json",
    
                    }
                }
    
                const res = await api.post("/newaddress", formData, config).catch((err) => toast.error(err.message));
                if (res.status == 200) {
                   
                    const emptyState = {
                        fullname: "",
                        mobile: "",
                        address1: "",
                        address2: "",
                        landmark: "",
                        pincode: "",
                        country: "",
                        city: "",
                        state: "",
                    };
                    setaddress(emptyState);
                    toast.success("New Address Added!");
                }
    
            }
            else {
                toast.info("Enter all details!");
            }
    
    
         }

        
    }

    return (
        <div className='address_form_main_container'>
            <h1 style={{marginBottom:"15px",fontWeight:"500"}}> New Address</h1>
            <form className='address_form_form'>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Fullname </label>
                    <input type="text" placeholder="Enter Fullname" name="fullname" value={address.fullname} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Mobile.no </label>
                    <input type="text" placeholder="Enter Mobile.no" name="mobile" value={address.mobile} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Address1 </label>
                    <input type="text" placeholder="Enter Address1" name="address1" value={address.address1} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Address2 </label>
                    <input type="text" placeholder="Enter Address2" name="address2" value={address.address2} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Landmark </label>
                    <input type="text" placeholder="Enter Landmark" name="landmark" value={address.landmark} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label ><span className='otherspan'>⁎</span>Pincode </label>
                    <input type="text" placeholder="Enter Pincode" name="pincode" value={address.pincode} className='address_input_field' onChange={onChange} required />
                </div>

                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>Country </label>
                    <input type="text" placeholder="Enter Country" name="country" value={address.country} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>City </label>
                    <input type="text" placeholder="Enter City" name="city" value={address.city} className='address_input_field' onChange={onChange} required />
                </div>
                <div className='address_div' >
                    <label > <span className='otherspan'>⁎</span>State </label>
                    <input type="text" placeholder="Enter State" name="state" value={address.state} className='address_input_field' onChange={onChange} required />
                </div>
                <div>
                    <button className='submit_address_btn' onClick={handleformsubmit}> + Add Address</button>
                    <Link href={"/userdashboard/useraddress"}><button className='submit_address_btn' > ← Go Back</button></Link>
                    
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Page
