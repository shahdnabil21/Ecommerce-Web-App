import React from 'react'
import useApi from '../../Hooks/useApi'
import { Link } from 'react-router-dom'

export default function Brands() {
  let { data, isLoading } = useApi("brands")
  let barndList = data?.data?.data
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className="loader"></span>
      </div>
    )
  }



  return (
    <>
      <div className='containerL md:flex flex-wrap'>
        {barndList?.map((brand) => {
          return (
            <div key={brand._id} onClick={() => {
              console.log(brand._id);
            }} className='sm:w-full md:6/12  lg:w-3/12 mt-6'>
              <Link to={`/branddetails/${brand._id}`}>
                <img src={brand.image} className='w-full md:w-70 object-cover' alt={brand.name} />
              </Link>
            </div>
          )
        })}
      </div>

    </>
  )
}
