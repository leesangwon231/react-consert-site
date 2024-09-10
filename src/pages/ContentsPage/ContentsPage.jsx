import 'bootstrap/dist/css/bootstrap.min.css';
import "./ContentsPage.css"
import {useEffect, useState} from "react";
import axios from "axios";
import AllContents from "./component/AllContents/AllContents.jsx";
import MyLocationContents from "./component/MyLocationContents/MyLocationContents.jsx";
const ContentsPage = () => {

    // 테스트용 함수 삭제 예정

    return (
        <div>
            <AllContents/>
            <MyLocationContents/>
        </div>
    )
}

export default ContentsPage;