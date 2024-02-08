import React from 'react';
import '../styles/productcard.css';
import StarRatings from "react-star-ratings";


const ProductShimmer = () => {
    return (
        <div className='product_shimmer_container'>

            {
                [1, 2, 3, 4, 5, 6].map((item,index) => {
                    return (
                        <div className='product_shimmer_card_div' key={index}>
                            <div className='productshimmer_image_div'>
                               <div className='image_div'></div>
                            </div >
                            <div className='card_body'>
                                <div className='card_shimmer_title'>
                                    <span className='card_title'></span>
                                </div>
                                <div className='card_rating'>
                                    <StarRatings
                                        rating={0}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        name="rating"
                                    />
                                </div>
                                <h2></h2>
                            </div>
                            <div className='addcart_div'>
                                <button className='addcart_shimmer_btn'>ADD TO CART</button>
                            </div>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default ProductShimmer
