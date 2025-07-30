import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './compontent/Layout/Layout'
import Product from './compontent/Product/Product'
import Home from './compontent/Home/Home'
import Cart from './compontent/Cart/Cart'
import Login from './compontent/Login/Login'
import Signup from './compontent/Signup/Signup'
import Notfound from './compontent/Notfound/Notfound'
import ForgetPassword from './compontent/ForgetPaaword/ForgetPassword'
import Resetpass from './compontent/ResetPass/Resetpass'
import AuthcontextProvider from './compontent/Context/AuthcontextProvider'
import ProtectRouting from './compontent/Context/ProtectRouting'
import Brands from './compontent/Brands/Brands'
import Category from './compontent/Category/Category'
import ProductDetails from './compontent/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BrandDetails from './compontent/BrandsDetails/BrandDetails'
import CartContextProvider from './compontent/Context/CartContextProvider'
import ShippingDetails from './compontent/ShippingDetails/ShippingDetails'


export default function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectRouting><Home /></ProtectRouting> },
        { path: "product", element: <ProtectRouting><Product /></ProtectRouting> },
        { path: "cart", element: <ProtectRouting><Cart /></ProtectRouting> },
        { path: "brands", element: <ProtectRouting><Brands /></ProtectRouting> },
        { path: "category", element: <ProtectRouting><Category /></ProtectRouting> },
        { path: "productdetails/:id/:name", element: <ProtectRouting><ProductDetails /></ProtectRouting> },
        {path: "branddetails/:id",element:<ProtectRouting><BrandDetails/></ProtectRouting>},
        {path: "ShippingDetails/:id",element:<ProtectRouting><ShippingDetails/></ProtectRouting>},


        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <Resetpass /> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])
  let client = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={client}>
        <AuthcontextProvider>
          <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
          </CartContextProvider>
        </AuthcontextProvider>
      </QueryClientProvider>



    </div>
  )
}

