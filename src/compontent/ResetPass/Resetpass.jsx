import axios from 'axios'
import { ErrorMessage, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Resetpass() {
  let navg = useNavigate()
  let [errorMessage, setErr] = useState(null)
  let validYup = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
    newPassword: Yup.string().required("Password required"),
  })
  const baseUrl = "https://ecommerce.routemisr.com"
  let newpassForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validYup,
    onSubmit: newPasswordApi,
  })
  function newPasswordApi(data) {
    axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
      if (req.data.token) {
        navg("/login");
      }

    })
    .catch((err)=>{
      setErr(err.response.data.message);
    })
  }
  return (
      <>
      <h1 className='text-active text-center mt-7 text-2xl font-bold'>Reser password</h1>

    {errorMessage ? <div className="p-4 mb-4 mt-3 text-center w-7/12 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert"> {errorMessage} </div> : "" }



     
<form onSubmit={newpassForm.handleSubmit} className="w-7/12 mx-auto">
   
        <div className="mb-5">
          <label htmlFor="email" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <input onBlur={newpassForm.handleBlur} value={newpassForm.values.email} onChange={newpassForm.handleChange} type="email" id="email"  name="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {newpassForm.touched.email && newpassForm.errors.email ? <p className='text-red-600'>{newpassForm.errors.email}</p> :"" }
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your newPassword</label>
          <input onBlur={newpassForm.handleBlur} value={newpassForm.values.password} onChange={newpassForm.handleChange} type="password" id="newPassword" name="newPassword"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {newpassForm.touched.password && newpassForm.errors.password ? <p className='text-red-600'>{newpassForm.errors.newPassword}</p> :""}
        </div>
        <button disabled={!(newpassForm.dirty && newpassForm.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 mb-3 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-35 ">Update</button>
      </form>

      </>
  )
}

