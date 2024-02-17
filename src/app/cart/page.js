"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '@/app/components/CartItem';
import CartItem from '@/app/components/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import api from '../apiMiddleware';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinnerLoader from '../components/SpinnerLoader';
import encryptStorage from '../encryptstorage';

const Page = () => {
    const [allAddress, setallAddress] = useState([]);
    const [cartData, setcartData] = useState([]);
    const [subTotal, setsubTotal] = useState(0);
    const [isloading, setisloading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleAddressChange = (event) => {

        setSelectedAddress(event.target.value);
    };
    const router = useRouter();

    console.log("user address", allAddress);

    const subtotalPrice = () => {
        if (cartData.length) {
            let totalPrice = 0;
            for (let i = 0; i < cartData.length; i++) {
                totalPrice = Number(totalPrice) + Number(cartData[i].total_price);
            }
            setsubTotal(totalPrice);
        }
    }



    async function fetchallcartItems(id) {
        let userid = id;
        let req = await api.get(`/allcartdata?id=${userid}`).then((res) => {
            const data = res?.data[0].cartItems;
            setcartData(data);
            setisloading(false);

        }).catch((error => console.log(error)));
    };

    async function fetchalluseraddress(id) {
        let userid = id;
        let req = await api.get(`/alluseraddress?id=${userid}`).then((res) => {
            const data = res?.data?.addresses;
            setallAddress(data);

        }).catch((error => console.log(error)));
    };


    //.......................................CHECKOUT FUNCTION............................................  
    async function handleCheckout(e) {
        e.preventDefault();



        if (cartData.length && subTotal && selectedAddress != '') {

            const shippingAddress = allAddress.find((address) => address.address_id == selectedAddress);
            console.log(shippingAddress);
            const securedata = encryptStorage.getItem("encrypted data");
            const userData = JSON.parse(securedata);

            if (!userData) {
                router.push("/login");
            }
            else {

                const userid = userData.user_id;
                const stripe = await loadStripe("pk_test_51Of4JlSHzjhUWugHQqGJDCuj06HRD0AHYBffFFMEG60BKV0BCnaj3tYsbeJfACUjkwD9PmAgKPTfXbXaXH7vLAUA00JGpvaCKW");

                const body = {
                    userId: userid,
                    products: cartData,
                    shippingInfo: shippingAddress
                }
                const headers = {
                    "content-Type": "application/json",
                }
                const res = await fetch("https://e-commerce-backend-next.vercel.app/checkoutsession", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body)
                });

                const session = await res.json();
                const result = stripe.redirectToCheckout({
                    sessionId: session.id
                });
                if (result.error) {
                    console.log(result.error);
                }

            }
        } else {
            toast.info("Please select shipping information or address");
        }


    }

    useEffect(() => {

        const securedata = encryptStorage.getItem("encrypted data");
        const userData = JSON.parse(securedata);

        if (!userData) {
            router.push("/login");
        }
        else {
            fetchallcartItems(userData.user_id);
            fetchalluseraddress(userData.user_id);
        }

    }, [])

    useEffect(() => {
        subtotalPrice();
    }, [cartData])

    return (
        <div className='cartpage_container'>
            <div className='yourcart_div'>
                <span className='Your_cart'>Your Cart<span className='special_span'>{(!cartData.length != 0 && isloading == false) ? ("(Empty)") : ""}</span></span>
            </div>
            {
                isloading ? <SpinnerLoader /> : (
                    <>
                        <div className='cartpage_other_spans'>
                            <span ><Link href="/" style={{ color: "grey" }}>Continue Shopping </Link> </span>
                            <span>{cartData.length} items</span>
                            <span className='need_help_span'>Need Help? Call(600)947-4382</span>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            {
                                (subTotal >= 999 && cartData.length != 0) ? <span style={{ color: "green", paddingLeft: "5px", fontWeight: "bold" }}>You are eligible for free delivery!</span>
                                    : cartData.length != 0 && <span style={{ color: "red", paddingLeft: "5px", fontWeight: "bold" }} >You are ₹{999 - subTotal} away from free delivery!</span>
                            }
                        </div>

                        <div className='cartpage_main_div'>
                            <div className='left_div'>
                                {cartData.length != 0 ? (
                                    cartData.map((item) => {
                                        return <CartItem item={item} cartData={cartData} setcartData={setcartData} key={item.product_id} />
                                    })
                                ) : (
                                    <div className='no_cart_div'>
                                        <img src='https://nothingfromchina.com/pub/static/frontend/MageBig/martfury_layout05/en_US/images/empty-cart.svg' className='no_cart_img' />
                                    </div>
                                )
                                }

                            </div>
                            {
                             cartData.length != 0 ? (
                             <div className='lower_shipping_div'>
                                <div className='shipping_info_container'>
                                    <h1>Shipping Information</h1>
                                    <div className='shipping_addresses_div'>
                                        {
                                            allAddress?.length ?
                                                allAddress.map((address) => {
                                                    return (<div className='user_address_div' key={address?.address_id}>
                                                        <input type='radio' className='radio_input'
                                                            value={address?.address_id} id={address?.address_id}
                                                            checked={selectedAddress == address?.address_id}
                                                            onChange={handleAddressChange}
                                                        />
                                                        <label htmlFor={address.address_id} >
                                                            <div>
                                                                <span>{address?.fullname + " ( " + address?.mobile + " )"}</span><br></br>
                                                                <span>{address?.address1}</span><br></br>
                                                                <span>{address?.address2}</span><br></br>
                                                                <span>{address?.landmark}</span><br></br>
                                                                <span>{address?.country + "," + address?.city + "," + address?.state + "," + address?.pincode}</span><br></br>
                                                            </div>
                                                        </label>
                                                    </div>)
                                                })
                                                : "You have not added any address yet.Please add a new address!"
                                        }
                                    </div>
                                    <Link href={"/userdashboard/useraddress/addnewaddress"}>
                                        <button className='addnew_button'>+Add new address</button>
                                    </Link>

                                </div>
                               
                                        <div className="right_div">
                                            <div className="order_summary">
                                                <span>Order Summary</span>
                                            </div>
                                            <label>Enter Promo Code</label>
                                            <div className='promo_div'>
                                                <input type='text' placeholder='Promo Code' style={{ padding: "5px", width: "100%" }} />
                                                <button className='sub_btn' >Submit</button>
                                            </div>
                                            <div style={{ lineHeight: "2.5" }}>
                                                <h1>Promotions</h1>
                                                <div className='free_shipping_div'>
                                                    <span>Free Shipping on Orders Above ₹999</span>
                                                    <span>-₹40</span>
                                                </div>
                                                <div>
                                                    <ul style={{ paddingLeft: "0px" }}>
                                                        <li className='order_summary_li'>
                                                            <span className="key">Subtotal</span>
                                                            <span className="value">₹{subTotal}</span>
                                                        </li>
                                                        <li className='order_summary_li'>
                                                            <span className="key">Shipping Cost</span>
                                                            <span className="value">₹40</span>
                                                        </li>
                                                        <li className='order_summary_li'>
                                                            <span className="key">Shipping Discount</span>
                                                            <span className="value">{subTotal > 999 ? "-₹40" : "₹0"}</span>
                                                        </li>

                                                        <li className='order_summary_li'>
                                                            <span className="key">Estimated Total</span>
                                                            <span className="value">₹{subTotal > 999 ? subTotal : Number(subTotal) + 40}</span>
                                                        </li>
                                                    </ul>
                                                    <button className='checkout_btn' onClick={handleCheckout}>CHECKOUT</button>
                                                </div>
                                            </div>

                                        </div>

                            </div>
                             ) : ""
                             }
                             
                            <ToastContainer />
                        </div>

                    </>
                )}

        </div>
    )

}

export default Page
