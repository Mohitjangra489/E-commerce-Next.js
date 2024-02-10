'use client'

import '../styles/sidebar.css';
import React, { useContext } from "react";

import StarRatings from "react-star-ratings";
import SearchContext from './Context';

const Sidebar = () => {

  const value=useContext(SearchContext);

  const [searchValue, setsearchValue,filterCategory,setfilterCategory] = useContext(SearchContext);

    const handleFilterByCategory=(e)=>{
        setfilterCategory(e.target.value);
    }

    return (
        <div className='sidebar_container'>
           
            <div style={{ paddingLeft: "12px"}}>
                <h1 > Filter By Category</h1>
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
            </div>

        </div>
    )
}

export default Sidebar
