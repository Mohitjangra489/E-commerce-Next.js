'use client'
import '../styles/sidebar.css';
import React, { useContext, useState } from "react";
import SearchContext from './Context';

const Sidebar = () => {
    const [searchValue, setsearchValue, filterCategory, setfilterCategory] = useContext(SearchContext);
const [selectedCategory,setselectedCategory]=useState(filterCategory);
    const categories = ["All", "Whey Protein", "Advanced Fitness", "Energy", "Plant Protein","Weight Gainer"];



    const handleFilterByCategory = (e) => {
        setfilterCategory(e.target.value);
        setselectedCategory(e.target.value);
    }

    return (
        <div className='sidebar_container'>

            <div style={{ paddingLeft: "12px" }}>
                <span className='filter_span'> Filter By Category</span>
                <ul className='sidebar_ul'>
                    {
                        categories.map((item) => {
                            return (
                                <li>
                                    <label >
                                       {
                                        item!==selectedCategory && <input name="category" type="radio" value={item} className="select_input_tag" onClick={handleFilterByCategory} />
                                       } 
                                        <span className={item==selectedCategory ?'select_category_span':""} >{item} </span>
                                    </label>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        </div>
    )
}

export default Sidebar
