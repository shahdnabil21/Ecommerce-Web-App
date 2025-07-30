import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Signup() {
  let validForm = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Min char are 3").max(20, "Max char are 20"),
    email: Yup.string().required("Email is required").email("Enter valid email"),
    password: Yup.string().required("Password is required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Enter valid password"),
    rePassword: Yup.string().required("Please enter your password again").oneOf([Yup.ref("password")], "doesn't match"),
    phone: Yup.string().required("Phone is required").matches(/^(20)?01[1250][0-9]{8}$/, "Enter valid phone number")

  })
  let [ errorMessage, setError ] = useState(null)
  let navg = useNavigate()
  const baseUrl = "https://ecommerce.routemisr.com"
  async function registerApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message === 'success') {
          navg("/login")
        }
      })
      .catch((err => {
        setError(err.response.data.message)
      }))

  }
  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: registerApi,
    validationSchema: validForm
  })
  return (
    <>
      <h1 className='text-active text-center mt-7 text-2xl font-bold'>Sign up</h1>
      {errorMessage ? <div className="p-4 mb-4 mt-3 text-center w-7/12 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert"> {errorMessage} </div> : "" }


      <form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="name"  className="block mt-3 mb-2 text-sm font-medium text-gray-900">Your Name</label>
          <input onBlur={registerForm.handleBlur} value={registerForm.values.name} onChange={registerForm.handleChange} type="text" id="name" name="name"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {registerForm.touched.name && registerForm.errors.name ? <p className='text-red-600'>{registerForm.errors.name}</p> :""}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <input onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange} type="email" id="email"  name="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {registerForm.touched.email && registerForm.errors.email ? <p className='text-red-600'>{registerForm.errors.email}</p> :"" }
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} type="password" id="password" name="password"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {registerForm.touched.password && registerForm.errors.password ? <p className='text-red-600'>{registerForm.errors.password}</p> :""}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword"className="block mt-6 mb-2 text-sm font-medium text-gray-900">rePassword</label>
          <input onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} onChange={registerForm.handleChange} type="password" id="rePassword" name="rePassword"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className='text-red-600'>{registerForm.errors.rePassword}</p> :"" }
        </div>
        <div className="mb-5">
          <label htmlFor="phone"  className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your phone</label>
          <input onBlur={registerForm.handleBlur} value={registerForm.values.phone} onChange={registerForm.handleChange} type="tel" id="phone" name="phone"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {registerForm.touched.phone && registerForm.errors.phone ? <p className='text-red-600'>{registerForm.errors.phone}</p> :""}
        </div>
       
        <button disabled={!(registerForm.dirty && registerForm.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-35 ">Submit</button>
      </form>


    </>
  )
}
