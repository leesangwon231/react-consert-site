import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import { parseStringPromise } from 'xml2js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useContents} from "../../../../../hooks/useContents.jsx";
import "./Slider.css"
import {useQueries} from "@tanstack/react-query";
import {useContentsDetail} from "../../../../../hooks/useContentsDetail.jsx";
const Sliser = ({idArray}) => {


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplaySpeed: 2000,
        autoplay : true,
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
                {idArray?.map((posterData, index) => (
                    <div key={index}>
                        <img src={posterData?.poster}  alt=""/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Sliser;