import axios from 'axios'
import { ErrorMessage, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { Authcontext } from '../Context/AuthcontextProvider'

export default function Login() {
  let {setToken} = useContext(Authcontext)
  let navg = useNavigate()
  let [errorMessage, setErr] = useState(null)
  let validYup = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
    password: Yup.string().required("Password required"),
  })
  const baseUrl = "https://ecommerce.routemisr.com"
  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validYup,
    onSubmit: LoginApi,
  })
  function LoginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
      if (req.data.message == "success") {
        setToken(req.data.token)
        localStorage.setItem("token",req.data.token)

        navg("/");
      }

    })
    .catch((err)=>{
      setErr(err.response.data.message);
      console.log(err.response.data.message);
      
    })
  }
  return (
      <>
      <h1 className='text-active text-center mt-7 text-2xl font-bold'>Log in</h1>

    {errorMessage ? <div className="p-4 mb-4 mt-3 text-center w-7/12 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert"> {errorMessage} </div> : "" }



     
<form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
   
        <div className="mb-5">
          <label htmlFor="email" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <input onBlur={LoginForm.handleBlur} value={LoginForm.values.email} onChange={LoginForm.handleChange} type="email" id="email"  name="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {LoginForm.touched.email && LoginForm.errors.email ? <p className='text-red-600'>{LoginForm.errors.email}</p> :"" }
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input onBlur={LoginForm.handleBlur} value={LoginForm.values.password} onChange={LoginForm.handleChange} type="password" id="password" name="password"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "/>
          {LoginForm.touched.password && LoginForm.errors.password ? <p className='text-red-600'>{LoginForm.errors.password}</p> :""}
        </div>
        <button disabled={!(LoginForm.dirty && LoginForm.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 mb-3 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-35 ">Submit</button>
        <br/>
        <Link to='/forgetpassword' className=' text-gray-700'>Forget password?</Link>
      </form>

      </>
  )
}
