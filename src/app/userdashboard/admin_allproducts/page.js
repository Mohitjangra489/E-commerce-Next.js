'use client';
import React, { useEffect, useState } from 'react';
import '../adminroutes.css';
import { IoMdImages } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import api from '../../apiMiddleware';
import SpinnerLoader from '@/app/components/SpinnerLoader';


const Page = () => {
  const [allProducts, setallProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // router.push({pathname:`/?page=${event.selected}`},undefined,{ shallow: true });
    const newOffset = (event.selected * itemsPerPage) % allProducts.length;

    setItemOffset(newOffset);
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    let productid = e.target.id;
    const res = await api.delete(`/deleteproduct?id=${productid}`).catch((err) => toast.error(err.message));

    if (res.status == 200) {
      toast.success("Product Deleted successfully!");
      let products = [...allProducts];
      let remain = products.filter((item) => {
        return item._id != productid;
      })
      setallProducts(remain);
    }
    else {
      toast.error(res.message)
    }
  }


  useEffect(() => {
    async function fetchallproducts() {
      let req = await api.get('/allproducts').then((res) => { setallProducts(res.data) });
    };
    fetchallproducts();

  }, [])

  return (allProducts.length === 0) ? <SpinnerLoader /> : (
    <div className='products_maindiv_container'>
      <div className='total_products_div'>
        <h1>All Products List</h1>
      </div>
      <div className='products_container'>
        <div>
          <h1>{allProducts.length + " Products"}</h1>
        </div>
        <table className='product_table'>
          <tbody>
            <tr>
              <th>Product_Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            {
              currentItems.map((product, index) => {
                return (
                  <tr key={product._id}  >
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td ><div className='action_div' id={product._id} >
                      <Link href={`/userdashboard/admin_allproducts/${product._id}/updateImage`} ><IoMdImages fill='green' className='react-icons' /></Link>
                      <Link href={`/userdashboard/admin_allproducts/${product._id}/updateproduct`} ><FaEdit fill='orange' className='react-icons' /></Link>
                      <img src="https://res.cloudinary.com/dvg5lk5gr/image/upload/v1705780090/delete_ennox6.png" id={product._id} alt="deletelogo" className='delete_image'
                        onClick={(e) => { handleDelete(e) }}
                      />
                    </div></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='pagination_container'>

      </div>
      <ToastContainer />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
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
  )
}


export default Page
