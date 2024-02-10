"use client";
import './login.css';
import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '../apiMiddleware';


function Login() {

  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const router=useRouter();

  const handleSubmit = async () => {
    if (usernameRef.current !== "" && passwordRef.current !== "") {
      const userDetails = {
        username: usernameRef.current,
        password: passwordRef.current,
      }
      const config={
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await api.post("/logincheck",userDetails,config).catch((err) => {
        toast.error( err?.response?.data?.message);
        });

      if (res?.status == 200) {
        let localstoragedata=JSON.stringify(res?.data?.data);
        localStorage.setItem("UserData",localstoragedata);
        toast.success("Logged in successfully!");
        router.push("/");
      }
    }
    else {
      toast.info("Enter all details!");
    }
  }

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Optimum Nutrition India <br />
            <span style={{ color: "#b59461" }}>{"World's #1 Sports Nutrition Brand"}</span>
          </h1>

          <p className='px-3' >
            Our appetite for success continues, fuelled by strong growth,
            strategic investment and exciting new acquisitions that
            complement our existing portfolio.
          </p>

        </MDBCol>

        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e) => usernameRef.current = e.target.value} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => passwordRef.current = e.target.value} />

              <div className='d-flex justify-content-center mb-4'>
                <Link href="/signup" style={{ color: "rgb(181, 148, 97)" }}>Register Here</Link>
              </div>

              <MDBBtn className='mb-4' size='md' style={{ width: "100%", backgroundColor: "black", color: "white" }} onClick={handleSubmit}>Login</MDBBtn>

              <div className="text-center">

                <p>or login with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'rgb(181, 148, 97)' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
<ToastContainer/>
    </MDBContainer>
  );
}

export default Login;
