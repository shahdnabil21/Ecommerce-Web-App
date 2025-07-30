import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import { Authcontext } from '../Context/AuthcontextProvider';
import { CartContext } from '../Context/CartContextProvider';

export default function Nav() {
 let {numsCartIteams} = useContext(CartContext)
let navg = useNavigate()
function logOut(){
  localStorage.removeItem("token")
  setToken(null)
  navg("/login")
}
  let {token,setToken} = useContext(Authcontext);
  return (
    <>
      <nav className="bg-white border-gray-200 shadow sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap justify-between containerL items-center w-100 p-4">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logoImg} className="h-8" alt="Logo" />
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden items-center md:gap-80 justify-between w-full md:flex md:w-auto" id="navbar-default">
         {token ? ( <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <NavLink to="" className="block py-2 px-3" aria-current="page">Home</NavLink>
              </li>
             
              <li>
                <NavLink to="/product" className="block py-2 px-3" aria-current="page">Products</NavLink>
              </li>
             
              <li>
                <NavLink to="/cart" className="block py-2 px-3" aria-current="page">Cart</NavLink>
              </li>
             
              <li>
                <NavLink to="/brands" className="block py-2 px-3" >Brands</NavLink>
              </li>
              <li>
                <NavLink to="/category" className="block py-2 px-3" >Category</NavLink>
              </li>
            </ul>): ("")}
            <ul className="font-medium flex  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i class="fa-brands fa-instagram"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i class="fa-brands fa-facebook"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i class="fa-brands fa-tiktok"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" ><i class="fa-brands fa-twitter"></i></a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3" ><i class="fa-brands fa-linkedin"></i></a>
              </li>
              {token ? ( <>
              <li className='relative'>
                <a href="#" className='block py-2 px-3 '><i className="fa-solid fa-cart-shopping text-green-600 text-xl"></i></a>
                <span className='  absolute end-0 top-0 -translate-y-2 -translate-x-4 font-bold'>{numsCartIteams}</span>
              </li>
               <li>
                <span onClick={logOut} className="block py-2 px-3 cursor-pointer text-white bg-red-500 rounded-lg" aria-current="page">Logout</span>
              </li>
              </>
                
               )
               : (<>
                <li>
                <NavLink to="/login" className="block py-2 px-3" aria-current="page">Login</NavLink>
              </li>
             
              <li>
                <NavLink to="/signup" className="block py-2 px-3" aria-current="page">Signup</NavLink>
              </li>
              </> )}
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}
