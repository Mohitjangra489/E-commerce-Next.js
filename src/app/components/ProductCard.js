import Link from 'next/link'
import React, { useState } from 'react'
import '../styles/productcard.css';
import StarRatings from "react-star-ratings";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../apiMiddleware';
import encryptStorage from '../encryptstorage';


const ProductCard = ({ product }) => {
  const router = useRouter();

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
        toast.error("Something went wrong!")
      });
      if(res.status==200){
        toast.success(res?.data?.message);
       }

    }
  }

  return (
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
        {product?.stock !== "0" ? <button className='addcart_btn' onClick={handleAddToCart}>ADD TO CART</button> : <button className='addcart_btn' >OUT OF STOCK</button>}
      </div>
<ToastContainer/>
    </div>
  )
}

export default ProductCard;
