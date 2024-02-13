"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productdetail.css';
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import api from '../apiMiddleware';
import encryptStorage from '../encryptstorage';
import SpinnerLoader from '../components/SpinnerLoader';


const Page = ({ params }) => {
    const [productData, setproductData] = useState([]);
    const [isloaded, setisloaded] = useState(false);
    const [productRating, setproductRating] = useState(1);
    const router = useRouter();

    const product_id = params.productDetail[0];


    const handleAddToCart = async () => {
        const securedata = encryptStorage.getItem("encrypted data");
        const userData=JSON.parse(securedata);
        if (!userData) {
            router.push("/login");
        }
        else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            let bodyData = {
                user_id: userData.user_id,
                product_id: productData._id,
                name: productData.name,
                description: productData.description,
                image: productData.images.url,
                price_per_piece: productData.price,
                seller: productData.seller,
                category: productData.category,
                quantity: "1",

            }

            const res = await api.post("/addcart", bodyData, config).catch((err) => {
                toast.error("Something went wrong!")
            });
            if (res.status == 200) {
                toast.success(res?.data?.message);
            }
        }
    };


    useEffect(() => {
        async function getProductData() {
       
            
            const headers = {
                "Authorization": `bearer ${userData.token}`
            }
            await api.get(`/getproductdetails?id=${product_id}`, { headers }).then((res) => {
                setproductData(res.data[0])
                setproductRating(Number(res.data[0].ratings));
                setisloaded(true);
            }
            )
                .catch((error) => {
                    if (error?.response?.data?.message == "Invalid Token") {
                        encryptStorage.removeItem("encrypted data");
                        toast.error(error.message);
                        router.push("/login");
                    }
                    else {
                        toast.error(error.message);
                    }

                });
        }

        const securedata = encryptStorage.getItem("encrypted data");
        const userData=JSON.parse(securedata);

        if (!userData) {
            router.push("/login");
        }
        else {
            getProductData();
        }
       

    }, []);

    return (
        <>
            {
                isloaded ? (
                    <div className='productdetails_container'>
                    <div className='upper_div'>
                        <div className='product_image_container'>
                            <img src={productData?.images?.url} className='product_image'></img>
                        </div>
                        <div className='details_div'>
                            <div>
                                <div className='product_namee_div'>
                                    <span>{productData?.name}</span>
                                </div>
                                <div>
                                    <p style={{ wordSpacing: "3px" ,textAlign: "justify"}}>{productData?.description}</p>
                                </div>
                                <div className='rating_div'>
                                    <StarRatings
                                        rating={productRating}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        name="rating"
                                    />
                                </div>
                                <div className='other_details'>
                                    <span>Price: ₹{productData?.price}</span><br></br>
                                    <span>Flavour: {productData?.flavour}</span><br></br>
                                    <span>Size: {productData?.size}</span><br></br>
                                    <span style={{fontSize: "1rem",fontWeight: "600"}}>Sold By {productData?.seller}</span><br></br>
                                </div>

                            </div>
                            <div className='addtocart_div'>
                                {productData.stock !== "0" ? <button className='cart_btn' onClick={handleAddToCart}>ADD TO CART</button> : <button className='cart_btn' >OUT OF STOCK</button>}
                            </div>                          

                            <div>
                                <div className='check_pincode_div'>
                                    <label>CHECK PIN CODE SERVICEABILITY</label>
                                    <div className='checkpin_input'>
                                        <input type='text' className='input_pin' placeholder='330223'></input>
                                        <button  className='check_checkbtn'>CHECK</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    </div>
                ) :<SpinnerLoader/>
            }

            <ToastContainer />
        
        </>
    )
}

export default Page
