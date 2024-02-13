"use client";
import React, { useEffect, useState } from 'react'
import '../updatepassword/updatepassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import api from '../../apiMiddleware';
import encryptStorage from '../../encryptstorage';

const Page = () => {

  const [current, setcurrent] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmnewpassword, setconfirmnewpassword] = useState("");

  const handleupdate = async (e) => {
    e.preventDefault();
    if (current && newpassword && confirmnewpassword) {
      if (newpassword == confirmnewpassword) {
        const securedata = encryptStorage.getItem("encrypted data");
            const userData=JSON.parse(securedata);
        if (!userData) {
          router.push("/");
        }
        else {
          const user_id = userData.user_id;
          const config = {
            headers: {
              "content-Type": "application/json",

            }
          }
         const formdata = {
            user_id: user_id,
            current_password: current,
            new_password: newpassword,
          }
          const res = await api.post(`/changepassword`,formdata,config).catch((err) => toast.error(err.message));
          if (res.status == 200) {
            setcurrent("");
            setconfirmnewpassword("");
            setnewpassword("");
            toast.success(res?.data?.message);
          }
        }
      }
      else {
        toast.error("Password confirmation doesn't match");
      }
    } else {
      toast.info("Enter all details!");
    }

  }



  return (
    <div className='update_password_container'>

      <form className='updatepassword_form_form'>
        <h1 style={{ marginBottom: "15px", fontWeight: "500" }}>Change Password</h1>
        <div className='update_div' >
          <label > <span className='label_span'>⁎</span>Current Password </label>
          <input type="password" placeholder="Enter current password" name="current" value={current} className='password_input_field' onChange={(e) => setcurrent(e.target.value)} required />
        </div>

        <div className='update_div' >
          <label > <span className='label_span'>⁎</span>New Password </label>
          <input type="password" style={{ marginBottom: "10px" }} placeholder="Enter new password" name="new" value={newpassword} className='password_input_field' onChange={(e) => setnewpassword(e.target.value)} required />
          <input type="password" placeholder="Confirm new password" name="confirmnew" value={confirmnewpassword} className='password_input_field' onChange={(e) => setconfirmnewpassword(e.target.value)} required />
        </div>
        <div>
          <button className='submit_update_btn' onClick={handleupdate} > Update Password</button>
          <Link href={"/userdashboard"}><button className='submit_update_btn' > ← Go Back</button></Link>

        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Page
