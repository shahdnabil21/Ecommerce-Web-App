import React from 'react'
import img from "../../assets/images/error.svg"
export default function Notfound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={img} alt="Error 404" className="w-1/2 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-700">Page Not Found</h1>
      <p className="text-gray-500 mt-2">Sorry, the page you're looking for doesn't exist.</p>
    </div>
  )
}
