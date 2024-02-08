import React from 'react'
import '../cart/cartpage.css';
import axios, { all } from 'axios';

import { CiSquarePlus, CiSquareMinus, CiSquareRemove } from "react-icons/ci";

const CartItem = ({ item, cartData, setcartData }) => {

  const handleDeleteCartitem = async () => {
    let userData = JSON.parse(localStorage.getItem("UserData"));
    if (!userData) {
      router.push("/login");
    }
    else {
      let userid = userData?.user_id;
      let req = await axios.delete(`http://localhost:8000/deletecartitem?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
        const data = res?.data;
        console.log(data);
        // setcartData(data);
        if (res.status == 200) {
          console.log("inside res.status", res.status, cartData, [...cartData]);
          let updatedcartdata = cartData.filter((cartitem) => {
            return cartitem.product_id != item.product_id;
          });
          console.log(updatedcartdata);
          setcartData(updatedcartdata);
        }

      }).catch((error => console.log(error)));
    }
  }

  const handleincreasequantity = async () => {
    let userData = JSON.parse(localStorage.getItem("UserData"));
    if (!userData) {
      router.push("/login");
    }
    else {
      let userid = userData?.user_id;
      let req = await axios.post(`http://localhost:8000/pluscart?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
        const data = res?.data;
        console.log(data);

        if (res.status == 200) {

          console.log("inside res.status", res.status, cartData, [...cartData]);
          let alldata = [...cartData];

          for (let i = 0; i < alldata.length; i++) {
            if (alldata[i].product_id == item.product_id) {
              alldata[i].quantity = Number(alldata[i].quantity) + 1;
              alldata[i].total_price = Number(alldata[i].price_per_piece) * Number(alldata[i].quantity);
            }
          }

          console.log(alldata);
          setcartData(alldata);
        }

      }).catch((error => console.log(error)));
    }
  }

  const handledecreasequantity = async () => {
    if (item.quantity > 1) {
      let userData = JSON.parse(localStorage.getItem("UserData"));
      if (!userData) {
        router.push("/login");
      }
      else {
        let userid = userData?.user_id;
        let req = await axios.post(`http://localhost:8000/minuscart?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
          const data = res?.data;
          console.log(data);

          if (res.status == 200) {

            console.log("inside res.status", res.status, cartData, [...cartData]);
            let alldata = [...cartData];

            for (let i = 0; i < alldata.length; i++) {
              if (alldata[i].product_id == item.product_id) {
                if (alldata[i].quantity > 1) {
                  alldata[i].quantity = Number(alldata[i].quantity) - 1;
                  alldata[i].total_price = Number(alldata[i].price_per_piece) * Number(alldata[i].quantity);
                }

              }
            }

            console.log(alldata);
            setcartData(alldata);
          }

        }).catch((error => console.log(error)));
      }
    }
    

  }
  return (
    <div className='carttem_maindiv_container'>
      <div>
        <h1>{item?.name}</h1>
      </div>
      <div className='cartitems_main_container'>
        <div >
          <div className='ist_div'>
            <div>
              <img src={item?.image} alt='product' className='item_image' />
            </div>
            <div>
              <span className='heading_span'>Flavour</span><br></br>
              <span>Chocolate</span>
            </div>
          </div>
        </div>

        <div>
          <span className='heading_span'>Each</span><br></br>
          <span>₹{item.price_per_piece}</span>
        </div>

        <div>
          <label className='heading_span'>Quantity</label>
          <div>
            <CiSquarePlus className='plus' cursor="pointer" onClick={handleincreasequantity} />
            <span>{item.quantity}</span>
            <CiSquareMinus className='minus' cursor="pointer" onClick={handledecreasequantity} />
          </div>
        </div>

        <div>
          <span className='heading_span'>Total</span><br></br>
          <span>₹{item.total_price}</span>
        </div>

        <div className='remove_div'>
          <CiSquareRemove className='plus' onClick={handleDeleteCartitem} cursor="pointer" />
        </div>
      </div>

    </div>
  )
}

export default CartItem
