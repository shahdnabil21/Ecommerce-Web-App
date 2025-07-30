import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ShippingDetails() {
    let {id} = useParams();
        const headersOptions = {
        headers:{
            token:localStorage.getItem("token")
        }
    }
  let shippingFormik =   useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: ''
        },
        onSubmit:checkOutSession
    })
    function checkOutSession(values){
        let data = {
            shippingAddress: values
            
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,data,headersOptions)
        .then((req)=>{
            window.open(req.data.session.url)
        })
    }
  return (
    <>
  <div className='bg-green-50 container my-10 mx-auto p-5'>  
    <div className='w-96 mx-auto my-5  '>
        <h1>ShippingDetails</h1>
        <form  className='' onSubmit={shippingFormik.handleSubmit}>
            <div className="mb-5">
          <label htmlFor="details" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your details</label>
          <input onBlur={shippingFormik.handleBlur} value={shippingFormik.values.details} onChange={shippingFormik.handleChange} type="text" id="details"  name="details"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {shippingFormik.touched.details && shippingFormik.errors.details ? <p className='text-red-600'>{shippingFormik.errors.details}</p> :"" }
        </div>
            <div className="mb-5">
          <label htmlFor="city" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your city</label>
          <input onBlur={shippingFormik.handleBlur} value={shippingFormik.values.city} onChange={shippingFormik.handleChange} type="text" id="city"  name="city"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {shippingFormik.touched.city && shippingFormik.errors.city ? <p className='text-red-600'>{shippingFormik.errors.city}</p> :"" }
        </div>
            <div className="mb-5">
          <label htmlFor="phone" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your phone</label>
          <input onBlur={shippingFormik.handleBlur} value={shippingFormik.values.phone} onChange={shippingFormik.handleChange} type="tel" id="phone"  name="phone"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {shippingFormik.touched.phone && shippingFormik.errors.phone ? <p className='text-red-600'>{shippingFormik.errors.phone}</p> :"" }
        </div>
        <button className='btn'>Confirm</button>
        </form>
    </div>
    </div>

    </>
  )
}
