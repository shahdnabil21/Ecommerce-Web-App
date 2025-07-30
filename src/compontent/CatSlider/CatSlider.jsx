import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CatSlider() {
    let [categoryList, SetCategoryList] = useState(null)
    function getAllCat() {
        axios(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((req) => {
                SetCategoryList(req.data.data)
            })
            .catch((err) => { })
    }
    useEffect(() => {
        getAllCat()
    }, [])
    let settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <div className=' containerL slider-container'>
            <Slider   {...settings} className='my-10'>
                {categoryList?.map((category) => {
                    return (
                        <div key={category._id}>
                            <img src={category.image} className='h-60 w-60 object-cover' alt="" />
                            <h5>{category.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
