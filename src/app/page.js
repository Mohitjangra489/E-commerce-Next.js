'use client';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import SearchContext from './components/Context';
import ProductNotFound from './components/ProductNotFound';
import ProductShimmer from './components/ProductShimmer';

export default function Home() {
  const [allProducts, setallProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchValue, setsearchValue,filterCategory,setfilterCategory] = useContext(SearchContext);

  const router = useRouter();
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProducts.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    async function fetchallproducts() {
      let req = await axios.get('https://optimum-nutrition.vercel.app/allproducts').then((res) => { setallProducts(res.data); setTotalProducts(res.data) });
    };
    fetchallproducts();
    setisLoading(false);

  }, [])

  useEffect(() => {
    let value = searchValue;
    let category = filterCategory;
    if (value !== "") {
      let products = [...totalProducts];
      let searched = products.filter((product) => {
        return (product.name).toLowerCase().includes(value.toLowerCase());
      })

      setallProducts(searched);
    }
    else if (value == "" && category =="All") {
      setallProducts([...totalProducts]);
    }
    else
    {
      let products = [...totalProducts];
      let filtered = products.filter((product) => {
        return (product.category==category);
      })

      setallProducts(filtered);
    }
  }, [searchValue]);

  useEffect(() => {
    let category = filterCategory;
    console.log(category);
    if (category !== "All") {
      let products = [...totalProducts];
      let filtered = products.filter((product) => {
        return (product.category==category);
      })
      setallProducts(filtered);
    }
    else {
      console.log("inside elseif",category)
      setallProducts([...totalProducts]);
    }
  }, [filterCategory]);


  function renderData() {
    if (isLoading || totalProducts.length==0) {
      return <ProductShimmer />
    }
    else if (currentItems.length == 0) {
      return <ProductNotFound />
    }
    else {
      return (currentItems.map((product) => {
        return <ProductCard product={product} key={product._id} />
      }))
    }
  }


  useEffect(() => {
    window.scrollTo(0, 400);
  }, [currentItems]);


  return (
    <div className="product_list_container">
      
      <div className='product_list_div'>
        {

          renderData()
        }
      </div>
      <div className='pagination_container'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          previousLinkClassName='prev_link'
          nextLinkClassName='next_link'
          className='pagination'
          activeLinkClassName="activePage"
          disabledClassName="disabled_btn"
        />
      </div>

    </div>
  )
}
