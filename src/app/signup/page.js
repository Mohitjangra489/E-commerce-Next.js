"use client";
import React, { useRef } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '../apiMiddleware';


function Signup() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router=useRouter();

  const handleSubmit = async () => {
    if (nameRef.current!=="" && emailRef.current!=="" && passwordRef.current!=="") {

      const userDetails = {
        name: nameRef.current,
        username: emailRef.current,
        password: passwordRef.current,
      }
      // body={
      //   JSON.stringify(userDetails),
      // } 

      const config={
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await api.post("/register",userDetails,config).catch((err) => {
        toast.error( err?.response?.data?.message);
        });
      if(res?.status==200)
      { toast.success("Signed up successfully!");
       router.push("/login");
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

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => nameRef.current = e.target.value} />
                </MDBCol>

              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form2' type='email' onChange={(e) => emailRef.current = e.target.value} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' onChange={(e) => passwordRef.current = e.target.value} />

              <div className='d-flex justify-content-center mb-4'>
                <Link href="/login" style={{ color: "rgb(181, 148, 97)" }}>Back to Login</Link>
              </div>

              <MDBBtn className='mb-4' size='md' style={{ width: "100%", backgroundColor: "black", color: "white" }} onClick={handleSubmit}>Sign Up</MDBBtn>

              <div className="text-center">

                <p>or signup with:</p>

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

export default Signup;