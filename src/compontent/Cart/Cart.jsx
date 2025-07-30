import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContextProvider'
import { use } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ShippingDetails from '../ShippingDetails/ShippingDetails';

export default function Cart() {
 let {getUserCart,deleteItem,setNumsCartItems,clearIteam,updateCartCount} =  useContext(CartContext);
 let [cartData,setCartData] = useState(null);
 let [isLoading, setIsLoading] = useState(true);
 useEffect(()=>{
  getCartData();
},[])
 function getCartData(){
  setIsLoading(true);
  getUserCart()
  .then((req)=>{
    setCartData(req.data.data);
  setIsLoading(false);
  })
  .catch((err)=>{
    setIsLoading(false);
 })

 }
 function removeIteam(id){
  deleteItem(id)
  .then((req)=>{
    console.log(req);
    
    setNumsCartItems(req.data.numOfCartItems);
    setCartData(req.data.data);
    toast.success("Item removed successfully")

  })
  .catch((err)=>{
    console.log(err);
  })


 }
 function clearUserCart(){
  clearIteam()
  .then((req)=>{

  if(req.data.message == "success"){
    setCartData(null);
    setNumsCartItems(null);

  }
 })
  .catch((err)=>{
    console.log(err);
  })
 }

 function updateCount(id,count){
 document.getElementById(id).innerHTML ='<i class="fa-solid fa-spinner fa-spin text-active"></i>';
  updateCartCount(id,count).then((req => {
    setCartData(req.data.data);
    document.getElementById(id).innerHTML = count;
    console.log(id);
    
  }))
  .catch((err)=>{
    console.log(err);
  })
 }

 if(isLoading){
  return   <div className='h-screen flex justify-center items-center'>
  <span className="loader"></span>
</div>
}


  return (
    <>
    <Toaster></Toaster>
    {
      cartData?.products?.length>0 ?    <div className='w-10/12 mx-auto my-5'>
      <div className='bg-gray-100'>
        <h1 className='text-2xl my-2 mx-3 font-semibold'>Shop Cart </h1>
        <div className='flex justify-between '>
          <h2 className='text-2xl mx-3 text-active'>Total Price: <span className='text-black'>{cartData.totalCartPrice}EGP</span></h2>
          <button onClick={()=>clearUserCart()} className='bg-red-600 text-white p-2 rounded'>Clear Cart</button>
        </div>
        {cartData.products.map((item) =>{
          let {count , product , price} = item
          let {_id,title,imageCover} = product
          return  <div key={_id} className='divide-y-2 divide-white '>
            <div className='flex my-3 mx-3 items-center'>
            <div className='w-10/12'>
            <div className='flex justify-around'>
              <div className='w-1/12'>
              <img src={imageCover} className='w-full' alt={title} />
              </div>
              <div className='w-10/12'>
              <h2>{title}</h2>
              <h3 className='text-active my-1'>Price: {price}</h3>
              <button onClick={()=>removeIteam(_id)} className='border rounded my-2 p-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'><i class="fa-solid fa-trash"></i> Remove</button>
              </div>
    
            </div>
            </div>
            <div className='w-2/12'>
            <i onClick={()=>{updateCount(_id,count-1)}} class="fa-solid border cursor-pointer  border-active p-2 rounded p fa-minus"></i>
            <span className='mx-2' id={_id}>{count}</span>
            <i onClick={()=>{updateCount(_id,count+1)}} className="fa-solid border  cursor-pointer border-active p-2 p rounded fa-plus"></i>
            
            </div>
            
    
            </div>
            <hr />

            </div>
            
           

        } )}
      
      <Link className='btn font-bold block text-center' to={'/ShippingDetails/'+cartData._id}> Cheak Out <i className='fa-brands fa-cc-visa text-xl'></i> </Link>
      

      </div>

    </div>: <div className='bg-red-700 text-center text-white'>No data</div>
    }
    </>
  )

}
