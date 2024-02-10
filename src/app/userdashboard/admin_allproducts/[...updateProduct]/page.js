'use client';
import React, { useEffect, useLayoutEffect, useState, useMemo } from 'react'
import axios from 'axios';
import '../../../userdashboard/adminroutes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import api from '../../../apiMiddleware';

const UpdateProduct = ({ params }) => {
  const router=useRouter();
  const [file, setfile] = useState(null);
  const [productdata, setproductdata] = useState({});

  const [updatedproduct, setupdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    seller: "",
    stock: "",
    category: "",
    flavour:"",
    size:""
  });
  // const pathname=usePathname();
  const path = params.updateProduct[1];
  const product_id = params.updateProduct[0];



  const onChange = (e) => {
    e.preventDefault();
    setupdatedProduct({ ...updatedproduct, [e.target.name]: e.target.value });
  };
  const categories = [
    "Whey Protein",
    "Advanced Fitness",
    "Energy",
    "Plant Protein",
    "Weight Gainer",
  ];

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      const config = {
        headers: {
          "content-Type": "multipart/form-data",

        }
      }

      const res = await api.post(`/updateproductimage?id=${product_id}`, formData, config).catch((err) => toast.error(err.message));
      if (res.status == 200) {
        setfile("");
        toast.success("Image Updated successfully!");
      }
      else {
        toast.error(res.message)
      }
    }
    else
    {
      toast.info("Please Upload new image!");
    }

  }


  const handleformsubmit = async (e) => {
    e.preventDefault();
    let data = { ...updatedproduct };
    let { name, description, price, seller, stock, category,flavour,size } = data;
    if (name && description && price && seller && stock && category && flavour && size) {
      const config = {
        headers: {
          "content-Type": "application/json",
        }
      }


      const res = await api.post(`/updateproduct?id=${product_id}`, data, config).catch((err) => toast.error(err.message));
      if (res.status == 200) {
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
        setupdatedProduct(emptyState);
        toast.success("Product Updated successfully!");

      }
      else {
        toast.error(res.message)
      }
    }
    else
    {
      toast.info("Enter all details!");
    }


  }




  useEffect(() => {
    async function getProductData() {
       const userData=JSON.parse(localStorage.getItem("UserData"));

       const headers={
        "Authorization":`bearer ${userData.token}`
       }
      await api.get(`/getproductdetails?id=${product_id}`,{headers}).then((res) => {
        setupdatedProduct({
          name: res.data[0]?.name,
          description: res.data[0]?.description,
          price: res.data[0]?.price,
          seller: res.data[0]?.seller,
          stock: res.data[0]?.stock,
          category: res.data[0]?.category,
          flavour: res.data[0]?.flavour,
          size: res.data[0]?.size,
        })
      }
      )
        .catch((error) => { 
          if(error?.response?.data?.message=="Invalid Token")
          {
            localStorage.removeItem("UserData");
            toast.error(error.message);
            router.push("/");
          }
          else
          {
            toast.error(error.message);
          }
          
        });

    }
    getProductData();
  }, []);

  if (path == "updateImage") {

    return (

      <div className='updateimage_container'>
        <form className='form_data' style={{ padding: "10em", width: "60%" }} enctype="multipart/form-data" >
          <h1 style={{ textDecoration: "underline" }}>Update Image:-</h1>
          <label>Upload product: </label>
          <input type="file" name="photo" onChange={(e) => setfile(e.target.files[0])} required />
          <button type="submit" className='form_submit_btn' onClick={handleUpdateImage}>
            Update Product image
          </button>
        </form>
        <ToastContainer />

      </div>
    )
  }
  else if (path == "updateproduct") {
   
    return (
      <div className='admin_newproduct_container'>
        <form className='form1_data' enctype="multipart/form-data"  >
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1 >
              Update Product
            </h1>
          </div>

          <div className='product_name_div' >
            <label > Name </label>
            <input type="text" placeholder="Product name" name="name" value={updatedproduct.name} className='input_field' onChange={onChange} required />
          </div>

          <div className='product_desc_div'>
            <label> Description </label>
            <input className='input_field' type='text' placeholder="Product description" name="description" onChange={onChange} value={updatedproduct.description} required />
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
                    value={updatedproduct.price}
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
                  value={updatedproduct.category}
                  required
                  className='input_field'
                  style={{ width: "100%" }}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}  >
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
                value={updatedproduct.seller}
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
                    value={updatedproduct.stock}
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
              <label> Flavour </label>
              <input
                type="text" className='input_field'
                placeholder="Flavour"
                name="flavour"
                value={updatedproduct.flavour}
                onChange={onChange}
                required
              />
            </div>

            <div className='product_stock_div'>
              <label> Size(Kg/gm) </label>
              <div >
                <div >
                  <input
                    type="text"
                    value={updatedproduct.size}
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

          <button type="submit" className='form_submit_btn' onClick={handleformsubmit}>
            Update Product
          </button>
        </form>
        <ToastContainer />

      </div>
    )
  }
  else {
    return (
      <div>
        Route not found
      </div>)
  }



}

export default UpdateProduct
