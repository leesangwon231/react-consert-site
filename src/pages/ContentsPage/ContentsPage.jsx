import 'bootstrap/dist/css/bootstrap.min.css';
import "./ContentsPage.css"
import React from "react";
import AllContents from "./component/AllContents/AllContents.jsx";
import MyLocationContents from "./component/MyLocationContents/MyLocationContents.jsx";
const ContentsPage = () => {

    const ctprvn = {
        "서울특별시": 11,"부산광역시": 26,"대구광역시": 27,
        "인천광역시": 28, "광주광역시": 29,"대전광역시": 30,
        "울산광역시": 31,"세종특별자치시": 36,"경기도": 41,
        "강원특별자치도": 42,"충청북도": 43,"충청남도": 44,
        "전라북도": 45,"전라남도": 46,"경상북도": 47,
        "경상남도": 48,"제주특별자치도": 50
    };

    const performance = {
        "뮤지컬": "GGGA","콘서트": "CCCD","클래식/무용": "BBBC",
        "연극": "AAAA"
    }

    const perFormanceState = {
        "공연예정": "01","공연중": "02","공연완료": "03",
    }

    let performanceFilterArray = [ctprvn,performance,perFormanceState]

    performanceFilterArray = performanceFilterArray?.map((state)=>(
        Object.entries(state)
            .map((data) =>{
                return { [data[1]] : data[0]}
            })
    ));





    return (
        <div className={"ContentsPage_Container"}>
            <AllContents performanceFilterArray = {performanceFilterArray}/>
            <MyLocationContents ctprvn ={ctprvn}/>
        </div>
    )
}

export default ContentsPage;