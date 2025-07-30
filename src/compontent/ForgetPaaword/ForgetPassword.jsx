
import axios from 'axios'
import { ErrorMessage, useFormik } from 'formik'
import React, { useState } from 'react'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function ForgetPassword() {
    let navg = useNavigate()
    let [errorMessage, setErr] = useState(null)
    let [display,setDisplay] = useState(true)
    let validYup = Yup.object({
        email: Yup.string().required("email required").email("enter valid email"),
    })
    let validYup2 = Yup.object({
        resetCode: Yup.string().required("Enter valid code"),
    })
    const baseUrl = "https://ecommerce.routemisr.com"
    let ForgetForm = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validYup,
        onSubmit: forgetApi,
    })
    let resetForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema: validYup2,
        onSubmit: resetApi,
    })
    function forgetApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req);
                
                if (req.data.statusMsg == "success") {
                    setDisplay(false)
                }
            })
            .catch((err) => {
                setErr(err.response.data.message);
                console.log(err);
                
            })
            
    }
    function resetApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                if (req.data.status == "Success") {
                navg("/resetpassword")
                }

            })
            .catch((err) => {
                setErr(err.response.data.message);
            })
            
    }

    return (
        <>
        {display ?  <div>
           <h1 className='text-active text-center mt-7 text-2xl font-bold'>Forget Password</h1>
            {errorMessage ? <div className="p-4 mb-4 mt-3 text-center w-7/12 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert"> {errorMessage} </div> : ""}
            <form onSubmit={ForgetForm.handleSubmit} className="w-7/12 mx-auto">

                <div className="mb-5">
                    <label htmlFor="email" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Your Email</label>
                    <input onBlur={ForgetForm.handleBlur} value={ForgetForm.values.email} onChange={ForgetForm.handleChange} type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
                    {ForgetForm.touched.email && ForgetForm.errors.email ? <p className='text-red-600'>{ForgetForm.errors.email}</p> : ""}
                </div>
                <button disabled={!(ForgetForm.dirty && ForgetForm.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 mb-3 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-35 ">Send</button>
            </form>
           </div> 
           :
           <div>
           <h1 className='text-active text-center mt-7 text-2xl font-bold'>Reset code</h1>
            {errorMessage ? <div className="p-4 mb-4 mt-3 text-center w-7/12 m-auto text-sm text-red-800 rounded-lg bg-red-50 " role="alert"> {errorMessage} </div> : ""}
            <form onSubmit={resetForm.handleSubmit} className="w-7/12 mx-auto">

                <div className="mb-5">
                    <label htmlFor="resetCode" className="block mt-6 mb-2 text-sm font-medium text-gray-900">Enter code</label>
                    <input onBlur={resetForm.handleBlur} value={resetForm.values.resetCode} onChange={resetForm.handleChange} type="string" id="resetCode" name="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
                    {resetForm.touched.resetCode && resetForm.errors.resetCode ? <p className='text-red-600'>{resetForm.errors.resetCode}</p> : ""}
                </div>
                <button disabled={!(resetForm.dirty && resetForm.isValid)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 mb-3 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-35 ">Verify code</button>
            </form>
           </div>}
          
       
           

        </>
    )
}