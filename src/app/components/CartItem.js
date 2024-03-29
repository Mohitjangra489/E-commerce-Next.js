import React from 'react'
import '../cart/cartpage.css';
import axios, { all } from 'axios';

import { CiSquarePlus, CiSquareMinus, CiSquareRemove } from "react-icons/ci";
import api from '../apiMiddleware';
import encryptStorage from '../encryptstorage';

const CartItem = ({ item, cartData, setcartData,setshowBlurPage}) => {

  const handleDeleteCartitem = async () => {
  
    const securedata = encryptStorage.getItem("encrypted data");
            const userData=JSON.parse(securedata);
    if (!userData) {
      router.push("/login");
    }
    else {
      setshowBlurPage(true);
      let userid = userData?.user_id;
      let req = await api.delete(`/deletecartitem?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
        const data = res?.data;

        if (res.status == 200) {
          let updatedcartdata = cartData.filter((cartitem) => {
            return cartitem.product_id != item.product_id;
          });
          setcartData(updatedcartdata);
          setshowBlurPage(false);
        }

      }).catch((error => {
        console.log(error);
        setshowBlurPage(false);
      }));
    }
  }

  const handleincreasequantity = async () => {
   
    const securedata = encryptStorage.getItem("encrypted data");
            const userData=JSON.parse(securedata);
    if (!userData) {
      router.push("/login");
    }
    else {
      setshowBlurPage(true);
      let userid = userData?.user_id;
      let req = await api.post(`/pluscart?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
        const data = res?.data;

        if (res.status == 200) {

          let alldata = [...cartData];

          for (let i = 0; i < alldata.length; i++) {
            if (alldata[i].product_id == item.product_id) {
              alldata[i].quantity = Number(alldata[i].quantity) + 1;
              alldata[i].total_price = Number(alldata[i].price_per_piece) * Number(alldata[i].quantity);
            }
          }

          setcartData(alldata);
          setshowBlurPage(false);
        }

      }).catch((error => {
        console.log(error);
        setshowBlurPage(false);
      }));
    }
  }

  const handledecreasequantity = async () => {

    
    if (item.quantity > 1) {
      const securedata = encryptStorage.getItem("encrypted data");
      const userData=JSON.parse(securedata);
      if (!userData) {
        router.push("/login");
      }
      else {
        setshowBlurPage(true);
        let userid = userData?.user_id;
        let req = await api.post(`/minuscart?user_id=${userid}&product_id=${item.product_id}`).then((res) => {
          const data = res?.data;

          if (res.status == 200) {
            let alldata = [...cartData];

            for (let i = 0; i < alldata.length; i++) {
              if (alldata[i].product_id == item.product_id) {
                if (alldata[i].quantity > 1) {
                  alldata[i].quantity = Number(alldata[i].quantity) - 1;
                  alldata[i].total_price = Number(alldata[i].price_per_piece) * Number(alldata[i].quantity);
                }

              }
            }
            setcartData(alldata);
            setshowBlurPage(false);
          }

        }).catch((error => {
          console.log(error)
          setshowBlurPage(false);
        }
        ));
      }
    }


  }
  return (
    <div className='carttem_maindiv_container'>
      <div>
        <h1>{item?.name}</h1>
      </div>
      <div className='cartitems_main_container'>


        <div className='ist_div'>
          <div>
            <img src={item?.image} alt='product' className='item_image' />
          </div>
        </div>
        <div className='second_div'>
          <div>
            <span className='heading_span'>Flavour</span><br></br>
            <span>Chocolate</span>
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
            <CiSquareMinus className='minus' cursor="pointer" onClick={handledecreasequantity}  />
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

    </div>
  )
}

export default CartItem
