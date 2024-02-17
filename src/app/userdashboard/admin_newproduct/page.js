"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../adminroutes.css';
import api from '../../apiMiddleware';

const Page = () => {
  const [file, setfile] = useState(null);
  const [product, setProduct] = useState({category:"Advanced Fitness"});

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const categories = [
    "Whey Protein",
    "Advanced Fitness",
    "Energy",
    "Plant Protein",
    "Weight Gainer",

  ];

  const handleformsubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, seller, stock, category,flavour,size } = product;

    if (file && name && description && price && seller && stock && category && flavour && size) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('seller', seller);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('flavour', flavour);
      formData.append('size', size);

      const config = {
        headers: {
          "content-Type": "multipart/form-data",

        }
      }

      const res = await api.post("/newproduct", formData, config).catch((err) => toast.error(err.message));
      if (res.status == 200) {
        setfile("");
      const emptyState = {
        name: "",
        description: "",
        price: "",
        seller: "",
        stock: "",
        category: "",
        flavour:"",
        size:""

      };
      setProduct(emptyState);
        toast.success("New Product Added!");
      }

    } 
    else {
      toast.info("Enter all details!");
    }


  }
  return (
    <div className='admin_newproduct_container'>
      <form className='form_data' enctype="multipart/form-data" >
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1 >
            Create New Product
          </h1>
        </div>

        <div className='product_name_div' >
          <label > Name </label>
          <input type="text" placeholder="Product name" name="name" value={product.name} className='input_field' onChange={onChange} required />
        </div>

        <div className='product_desc_div'>
          <label> Description </label>
          <input className='input_field' type='text' placeholder="Product description" name="description" onChange={onChange} value={product.description} required />
        </div>

        <div className='product_other_div'>
          <div className='product_price_div'>
            <label > Price </label>
            <div >
              <div >
                <input
                  type="text"
                  className='input_field'
                  placeholder="0.00"
                  value={product.price}
                  name="price"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className='product_category_div'>
            <label > Category </label>
            <div >
              <select
                name="category"
                onChange={onChange}
                value={product.category}
                required
                className='input_select_field'

                style={{ width: "100%" }}
              >
                {categories.map((category) => (
                  <option key={category} value={category} >
                    {category}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>

        <div className='product_other_div'>
          <div className='product_seller_div'>
            <label > Seller / Brand </label>
            <input
              type="text" className='input_field'
              placeholder="Seller or brand"
              name="seller"
              value={product.seller}
              onChange={onChange}
              required
            />
          </div>

          <div className='product_stock_div'>
            <label> Stock </label>
            <div >
              <div >
                <input
                  type="text"
                  value={product.stock}
                  className='input_field'
                  placeholder="0"
                  name="stock"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

        </div>
        <div className='product_other_div'>
          <div className='product_seller_div'>
            <label >Flavour </label>
            <input
              type="text" className='input_field'
              placeholder="Flavour"
              name="flavour"
              value={product.flavour}
              onChange={onChange}
              required
            />
          </div>

          <div className='product_stock_div'>
            <label>Size(Kg/gm) </label>
            <div >
              <div >
                <input
                  type="text"
                  value={product.size}
                  className='input_field'
                  placeholder="Kg/gm"
                  name="size"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

        </div>
        <label>Upload product image: </label>
        <input type="file" name="photo"  style={{margin:"20px"}} onChange={(e) => setfile(e.target.files[0])} required />

        <button type="submit" className='form_submit_btn' onClick={handleformsubmit}>
          Create Product
        </button>
      </form>
      <ToastContainer />
    </div>

  )
}

export default Page
