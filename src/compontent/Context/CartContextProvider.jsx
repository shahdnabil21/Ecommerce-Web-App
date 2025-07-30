import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { createContext } from 'react'
export let CartContext = createContext();
export default function CartContextProvider({children}) {
  let [numsCartIteams, setNumsCartItems] = useState(null);
    const headersOptions = {
        headers:{
            token:localStorage.getItem("token")
        }
    }
  const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

useEffect(()=>{
  if(localStorage.getItem("token")){
    getUserCart().then((req)=>{
      console.log(req.data.numOfCartItems);
      
      setNumsCartItems(req.data.numOfCartItems);
    })
  }
},[])
function getUserCart(){
 return axios.get(baseUrl,headersOptions)
}


    function addItem(id){
        let dataObj = {
            productId:id,
        }
        return axios.post(baseUrl,dataObj,headersOptions)
    }


    function deleteItem(id){
       return axios.delete(`${baseUrl}/${id}`,headersOptions)
    }
    function clearIteam(){
       return axios.delete(baseUrl,headersOptions)
        
    }

    function updateCartCount(id,count){
        let dataObj = {
            count:count
        }
        return axios.put(`${baseUrl}/${id}`,dataObj,headersOptions)

    }
 

  return <CartContext.Provider value={{getUserCart,addItem,numsCartIteams,setNumsCartItems,deleteItem,clearIteam,updateCartCount}}>{children}</CartContext.Provider>
}
