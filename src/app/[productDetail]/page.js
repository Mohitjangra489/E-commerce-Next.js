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
// import ButtonWithLoader from '../components/ButtonWithLoader';


const Page = ({ params }) => {
    const [productData, setproductData] = useState([]);
    const [isloaded, setisloaded] = useState(false);
    const [productRating, setproductRating] = useState(1);
    const [showLoader, setShowLoader] = useState(false)

    const router = useRouter();

    const product_id = params.productDetail;

    console.log("params=", params)


    const handleAddToCart = async () => {
        setShowLoader(true);
        const securedata = encryptStorage.getItem("encrypted data");
        const userData = JSON.parse(securedata);
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
                setShowLoader(false);
            });
            if (res.status == 200) {
                setShowLoader(false);
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
                        router.push("/notFound");
                    }

                });
        }

        const securedata = encryptStorage.getItem("encrypted data");
        const userData = JSON.parse(securedata);

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
                                        <p style={{ wordSpacing: "3px", textAlign: "justify" }}>{productData?.description}</p>
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
                                        <span style={{ fontSize: "1rem", fontWeight: "600" }}>Sold By {productData?.seller}</span><br></br>
                                    </div>

                                </div>
                                <div className='addtocart_div'>
                                    {productData.stock !== "0" ? <button className='cart_btn' onClick={handleAddToCart} disabled={showLoader}>
                                        {!showLoader ? "Add To Cart" : <svg className="spinner" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                                                stroke="white"
                                            />
                                        </svg>}
                                    </button> : <button className='cart_btn' >OUT OF STOCK</button>}
                                </div>

                                <div>
                                    <div className='check_pincode_div'>
                                        <label>CHECK PIN CODE SERVICEABILITY</label>
                                        <div className='checkpin_input'>
                                            <input type='text' className='input_pin' placeholder='330223'></input>
                                            <button className='check_checkbtn'>CHECK</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : <SpinnerLoader />
            }

            <ToastContainer />

        </>
    )
}

export default Page
