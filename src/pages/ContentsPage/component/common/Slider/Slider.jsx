import React, {Component, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"
import {useContents} from "../../../../../hooks/useContents.jsx";
const Sliser = ({performanceKinds}) => {


/*
    const [param , setParam] = useState({
        shprfnm : "",
        signgucode : "",
        prfstate : "",
        shcate :  performanceKinds[1],
        page : 1,
    });
    const {data} =  useContents(param);

   const idArray = data?.dbs.db.map((data)=> {
       console.log(a);g
       return data.mt20id;
    });
*/



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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