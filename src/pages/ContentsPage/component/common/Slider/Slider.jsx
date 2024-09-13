import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Sliser.css"
const Sliser = () => {



    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
      <div className="slider-container">
          <Slider {...settings}>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt="" />
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
              <div>
                  <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF248732_240910_125126.png" alt=""/>
              </div>
          </Slider>
      </div>
  );
}

export default Sliser;