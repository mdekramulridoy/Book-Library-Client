import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div className='lg:h-[700px] md:h-[500px]'>
            <img src="https://i.ibb.co.com/FsGR59Z/1st-photo.jpg" alt="" /></div></SwiperSlide>
        <SwiperSlide><div className='lg:h-[700px] md:h-[500px]'>
        <img src="https://i.ibb.co.com/ZJzMXP8/2nd-photo.jpg" alt="" /></div></SwiperSlide>
        <SwiperSlide><div className='lg:h-[700px] md:h-[500px]'>
        <img src="https://i.ibb.co.com/qdqvFJ7/3rd-photo.jpg" alt="" /></div></SwiperSlide>

      </Swiper>
    </>
  );
}