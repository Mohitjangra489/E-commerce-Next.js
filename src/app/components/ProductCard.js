"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import '../styles/productcard.css';
import StarRatings from "react-star-ratings";
import { useRouter } from 'next/navigation';
import api from '../apiMiddleware';
import encryptStorage from '../encryptstorage';
import ButtonWithLoader from '../components/ButtonWithLoader';


const ProductCard = ({ product,toast }) => {
  const [showLoader, setShowLoader] = useState(false)
  const router = useRouter();

  const handleAddToCart = async () => {
    setShowLoader(true);
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
        product_id: product._id,
        name: product.name,
        description: product.description,
        image: product.images.url,
        price_per_piece: product.price,
        seller: product.seller,
        category: product.category,
        quantity: "1",

      }

      const res = await api.post("/addcart", bodyData, config).catch((err) => {
        setShowLoader(false);
        toast.error("Something went wrong!")
      });
      if(res.status==200){
        setShowLoader(false);
        toast.success(res?.data?.message);
       }

    }
  }

  return (
    <>
  
    <div className={product?.stock !== "0" ? 'product_card_div' : 'product_outofstock_div'}>

      <div className='product_image_div' onClick={() => { router.push(`/${product?._id}`) }}>
         <img alt='product_image' src={product?.images?.url} className='image' loading='lazy'  />
      </div >
      <div className='card_body'>
        <div className='card_title'>
          <span className='card_title'>{product?.name}</span>

        </div>
        <div className='card_rating'>
          <StarRatings
            rating={Number(product?.ratings)}
            starRatedColor="#ffb829"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            name="rating"
          />

        </div>
        <h2> ₹{product?.price} </h2>
      </div>
      <div className='addcart_div'>
        {product?.stock !== "0" ?<ButtonWithLoader  text="Add To Cart" work={handleAddToCart} loading={showLoader} disabled={showLoader} /> : <button className='addcart_btn' >OUT OF STOCK</button>}
      </div>
    </div>
    </>
  )
}

export default ProductCard;
