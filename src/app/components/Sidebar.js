'use client'

import '../styles/sidebar.css';
import React, { useContext } from "react";

import StarRatings from "react-star-ratings";
import SearchContext from './Context';

const Sidebar = () => {

  const value=useContext(SearchContext);

  const [searchValue, setsearchValue,filterCategory,setfilterCategory] = useContext(SearchContext);

    const handleFilterByCategory=(e)=>{
        console.log( e.target.checked,e.target.value)
        setfilterCategory(e.target.value);
    }

    return (
        <div className='sidebar_container'>
           <h1> Filter By Goal</h1>
            <div className='sidebar_setprice'>
                <h1>Price(₹)</h1>
                <div className="setprice_btn_div">
                    <div className="btn-div">
                        <input name="min" type="number"  placeholder="Min" className='input' />
                    </div>

                    <div className="btn-div">
                        <input name="max" type="number"  placeholder="Max" className='input' />
                    </div>

                    <div className="btn-div">
                        <button className='price_btn'>Go</button>
                    </div>
                </div>
            </div>
            <div style={{ paddingLeft: "12px"}}>
                <h3 >Category</h3>
                <ul  className='sidebar_ul'>
                    <li>
                        <label >
                            <input name="category" type="radio"value="All"className="h-4 w-4" onClick={handleFilterByCategory} />
                            <span > All </span>
                        </label>
                    </li>
                    <li>
                        <label >
                            <input name="category" type="radio"value="Whey Protein"className="h-4 w-4" onClick={handleFilterByCategory} />
                            <span > Whey Protein </span>
                        </label>
                    </li>
                    <li>
                        <label >
                            <input name="category"type="radio" value="Advanced Fitness"className="h-4 w-4" onClick={handleFilterByCategory}/>
                            <span > Advanced Fitness </span>
                        </label>
                    </li>
                    <li>
                        <label >
                            <input name="category"type="radio" value="Energy"className="h-4 w-4" onClick={handleFilterByCategory} />
                            <span > Energy </span>
                        </label>
                    </li>
                    <li>
                        <label >
                            <input name="category"type="radio" value="Plant Protein"className="h-4 w-4" onClick={handleFilterByCategory}/>
                            <span > Plant Protein </span>
                        </label>
                    </li>
                    <li>
                        <label >
                            <input name="category"type="radio" value="Weight Gainer"className="h-4 w-4" onClick={handleFilterByCategory}/>
                            <span > Weight Gainer </span>
                        </label>
                    </li>
                   
                </ul>

                {/* <hr className="my-4" />

                <h3 className="font-semibold mb-2">Ratings</h3>
                <ul className="ratings_ul">
                    
                        {[5, 4, 3, 2, 1].map((rating) => (<li key={rating} >
                            <label className="flex items-center">
                                <input name="ratings" type="radio" value={rating}className="h-4 w-4"/>
                                <span className="ml-2 text-gray-500">
                                    {" "}
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}   
                                        starDimension="20px"
                                        starSpacing="2px"
                                        name="rating"
                                    />{" "}
                                </span>
                            </label>
                            </li>
                        ))}
                    
                </ul> */}
            </div>

        </div>
    )
}

export default Sidebar
