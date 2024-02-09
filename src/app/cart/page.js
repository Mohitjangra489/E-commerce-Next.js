"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '@/app/components/CartItem';
import CartItem from '@/app/components/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const Page = () => {

    const [cartData, setcartData] = useState([]);
    const [subTotal, setsubTotal] = useState(0);
    const [discount, setdiscount] = useState(0);
    const router = useRouter();

    const subtotalPrice = () => {
        console.log("inside totalprice")
        if (cartData.length) {
            let totalPrice = 0;
            for (let i = 0; i < cartData.length; i++) {
                totalPrice = Number(totalPrice) + Number(cartData[i].total_price);
            }
            console.log(totalPrice);
            setsubTotal(totalPrice);
        }
    }



    async function fetchallcartItems(id) {
        let userid = id;
        let req = await axios.get(`https://e-commerce-backend-next.vercel.app/allcartdata?id=${userid}`).then((res) => {
            const data = res?.data[0].cartItems;
            console.log(data);
            setcartData(data);

        }).catch((error => console.log(error)));
    };


    //.......................................CHECKOUT FUNCTION............................................  
    async function handleCheckout(e) {
        e.preventDefault();

        if (cartData.length && subTotal) {
            let userData = JSON.parse(localStorage.getItem("UserData"));
            if (!userData) {
                router.push("/login");
            }
            else {

                const userid = userData.user_id;
                const stripe = await loadStripe("pk_test_51Of4JlSHzjhUWugHQqGJDCuj06HRD0AHYBffFFMEG60BKV0BCnaj3tYsbeJfACUjkwD9PmAgKPTfXbXaXH7vLAUA00JGpvaCKW");

                const body = {
                    products: cartData
                }
                const headers = {
                    "content-Type": "application/json",
                }
                const res = await fetch("http://localhost:8000/checkoutsession", {
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
        }


    }

    useEffect(() => {

        let userData = JSON.parse(localStorage.getItem("UserData"));
        if (!userData) {
            router.push("/login");
        }
        else {
            fetchallcartItems(userData.user_id);
        }

    }, [])

    useEffect(() => {
        subtotalPrice();
    }, [cartData])


    return (
        <div className='cartpage_container'>
            <div>
                <span className='Your_cart'>Your Cart<span className='special_span'>{!cartData.length!=0 &&"(Empty)"}</span></span>
            </div>
            <div>
                <div className='cartpage_other_spans'>
                    <span ><Link href="/" style={{ color: "grey" }}>Continue Shopping </Link> </span>
                    <span>{cartData.length} items</span>
                    <span>Need Help? Call(600)947-4382</span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    {
                        (subTotal >= 999 && cartData.length!=0) ? <span style={{ color: "green", paddingLeft: "5px", fontWeight: "bold" }}>You are eligible for free delivery!</span>
                            : cartData.length!=0 && <span style={{ color: "red", paddingLeft: "5px", fontWeight: "bold" }} >You are ₹{999 - subTotal} away from free delivery!</span>
                    }
                </div>

                <div className='cartpage_main_div'>
                    <div className='left_div'>
                        {cartData.length!=0? (
                            cartData.map((item) => {
                                return <CartItem item={item} cartData={cartData} setcartData={setcartData} key={item.product_id} />
                            })
                        ) :(
                            <div className='no_cart_div'>
                              <img src='https://nothingfromchina.com/pub/static/frontend/MageBig/martfury_layout05/en_US/images/empty-cart.svg' className='no_cart_img'/>
                            </div>
                        ) 
                        }

                    </div>
                    {
                        cartData.length!=0 ?(
                            <div className="right_div">
                                <div className="order_summary">
                                    <span>Order Summary</span>
                                </div>
                                <label>Enter Promo Code</label>
                                <div className='promo_div'>
                                    <input type='text' placeholder='Promo Code' style={{ padding: "5px", width: "100%" }} />
                                    <button className='sub_btn'>Submit</button>
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
                        ):""
                    }

                </div>
            </div>
        </div>
    )
}

export default Page
