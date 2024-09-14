import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate 추가
import { useContents } from "../../hooks/useContents";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ContentsPage.css"
import AllContents from "./component/AllContents/AllContents.jsx";
import MyLocationContents from "./component/MyLocationContents/MyLocationContents.jsx";
import {useParams} from "react-router-dom";
import Slider from "./component/common/Slider/Slider.jsx";
const ContentsPage = () => {
    let params = useParams();


    let performanceKinds = ["콘서트", "CCCD"];

    if(params.category === "musical"){
        performanceKinds = ["뮤지컬", "GGGA"]
    }else if(params.category === "classical"){
        performanceKinds = ["클래식/무용" , "BBBC"]
    }else if(params.category === "play"){
        performanceKinds = ["연극", "AAAA"]
    }

    const ctprvn = {
        "서울특별시": 11,"부산광역시": 26,"대구광역시": 27,
        "인천광역시": 28, "광주광역시": 29,"대전광역시": 30,
        "울산광역시": 31,"세종특별자치시": 36,"경기도": 41,
        "강원특별자치도": 42,"충청북도": 43,"충청남도": 44,
        "전라북도": 45,"전라남도": 46,"경상북도": 47,
        "경상남도": 48,"제주특별자치도": 50
    };

    const sortedState = {
        "가나다순": "01","최신순": "02"
    }

    const perFormanceState = {
        "공연예정": "01","공연중": "02","공연완료": "03",
    }

    let performanceFilterArray = [ctprvn,sortedState,perFormanceState]

    performanceFilterArray = performanceFilterArray?.map((state)=>(
        Object.entries(state)
            .map((data) =>{
                return { [data[1]] : data[0]}
            })
    ));





    return (
        <div className={"ContentsPage_Container"}>
            <Slider performanceKinds={performanceKinds}/>
            <AllContents performanceFilterArray = {performanceFilterArray} performanceKinds={performanceKinds}/>
            <MyLocationContents ctprvn ={ctprvn} performanceKinds = {performanceKinds}/>
        </div>
    );
};

export default ContentsPage;
