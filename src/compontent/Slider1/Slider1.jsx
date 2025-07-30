
import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/images/slider-2.jpeg'
import img2 from '../../assets/images/slider-image-1.jpeg'
import img3 from '../../assets/images/slider-image-2.jpeg'
import img4 from '../../assets/images/slider-image-3.jpeg'


export default function Slider1() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    cssEase: "linear"
  };
  return (
   <div className="flex flex-col md:flex-row containerL">
    <div className="w-12/12 md:w-9/12">
    <Slider {...settings} className="mt-7">
      <div>
        <img src={img1} className="w-full h-96 " alt="" />
      </div>
      <div>
      <img src={img2} className="w-full h-96 " alt="" />
      </div>
      <div>
      <img src={img3} className="w-full h-96 " alt="" />
      </div>
      <div>
      <img src={img4} className="w-full h-96 " alt="" />
      </div>
    </Slider>
    </div>
    <div className="w-12/12 md:w-3/12 mt-7">
    <img src={img2} alt="" className="w-full object-cover h-48" />
    <img src={img3} alt="" className="w-full object-cover  h-48" />

    </div>

   </div>
  );
}

