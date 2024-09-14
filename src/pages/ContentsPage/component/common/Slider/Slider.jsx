import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import { parseStringPromise } from 'xml2js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useContents} from "../../../../../hooks/useContents.jsx";
import "./Slider.css"
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../../../../../common/LoadingSpinner/LoadingSpinner.jsx";
import ErrorBox from "../../../../../common/ErrorBox/ErrorBox.jsx";
const Sliser = ({idArray,isLoading,isError}) => {


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplaySpeed: 2000,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 800,
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
    console.log(idArray)

    const navigator = useNavigate();

    const onClickSlider = (cardId) => {
        navigator(`${cardId}`);
    }

    if (isLoading) {
        return <LoadingSpinner/>;
    }
    if (isError) {
        return <ErrorBox error={error}/>;
    }


    return (

        <div className="slider-container">
            <Slider {...settings}>
                {idArray?.map((posterData, index) => (
                    <div key={index} onClick={() => onClickSlider(posterData.mt20id)}>
                        <img src={posterData?.poster} alt=""/>
                    </div>
                ))}
            </Slider>
        </div>
)
    ;
}

export default Sliser;