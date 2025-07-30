import axios from 'axios'
import React, { useContext, useState } from 'react'
import Slider1 from '../Slider1/Slider1'
import CatSlider from '../CatSlider/CatSlider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  let [page, SetPage] = useState(1)
 let{addItem , setNumsCartItems} = useContext(CartContext)
 function addCart(id){
  addItem(id).then((res)=>{
    setNumsCartItems(res.data.numOfCartItems);
    toast.success("Item added to cart successfully",{
      duration: 2500,
    })
    
  }).catch((err)=>{
    toast.error("Failed to add item to cart")
    
  })
 }

  function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Products", page],
    queryFn: getAllProducts
  })

  const productList = data?.data?.data
  const numberOfPages = data?.data?.metadata?.numberOfPages

  const changePage = (newPage) => {
    SetPage(newPage)
  }

  return (
    <>
    <Toaster></Toaster>
      {isLoading ? (
        <div className='h-screen flex justify-center items-center'>
          <span className="loader"></span>
        </div>
      ) : isError ? (
        <div className="text-center">Something went wrong. Please try again later.</div>
      ) : (
        <>
          <Slider1 />
          <CatSlider />
          <div className='w-10/12 mx-auto my-8'>
            <div className='flex flex-wrap space-y-5'>
              {productList?.map((product) => {
                const { _id, title, imageCover, price, category, ratingsAverage } = product
                const { name } = category
                return (
                  <div key={_id} className='lg:w-2/12 md:w-4/12 sm:w-6/12 w-full mt-4'>
                    <div className='item overflow-hidden group p-3 hover:border hover:border-active'>
                    <Link to={`productdetails/${_id}/${title}`}>
                        <img src={imageCover} alt={title} />
                        <h5 className='mt-2 text-active'>{name}</h5>
                        <h2 className='mb-2'>{title.split(" ").slice(0, 2).join(" ")}</h2>
                        <div className='flex justify-between'>
                          <span className='font-bold'>{price}EGP</span>
                          <span><i className='fa-solid fa-star text-yellow-300'></i> {ratingsAverage}</span>
                        </div>
                    </Link>
                    <button onClick={()=>addCart(_id)} className='btn mt-2 translate-y-40 group-hover:translate-y-0 duration-500 hover:bg-green-700'>Add to cart</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="flex justify-center items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                  Previous
                </button>
              </li>

              {new Array(numberOfPages).fill("").map((el, i) => (
                <li key={i}>
                  <button
                    onClick={() => changePage(i + 1)}
                    className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === i + 1 ? "bg-green-500 text-white" : ""}`}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page === numberOfPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  )
}
