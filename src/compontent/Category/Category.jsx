import React from 'react'
import useApi from '../../Hooks/useApi'

export default function Category() {
  let { data, isLoading } = useApi("categories")
  let categoryList = data?.data?.data
  if(isLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className="loader"></span>
      </div>
    )
  }
  return (
    <>
      <div className='containerL md:flex flex-wrap'>
        {categoryList?.map((category) => {
          return (
            <div key={category._id} className='sm:w-full md:6/12  lg:w-3/12 mt-6'>
              <img src={category.image} className=' w-full md:w-72 h-full md:h-72 object-cover' alt={category.name} />
              <h5>{category.name}</h5>
            </div>
          )
        })}
      </div>
    </>
  )
}
