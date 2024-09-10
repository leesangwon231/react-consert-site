import 'bootstrap/dist/css/bootstrap.min.css';
import "./Location.style.css"
import {useEffect, useState} from "react";
import axios from "axios";
import AllContents from "./component/AllContents/AllContents.jsx";
import MyLocationContents from "./component/MyLocationContents/MyLocationContents.jsx";
const LocationPage = () => {


    return (
        <div>
            <AllContents/>
            <MyLocationContents/>
        </div>
    )
}

export default LocationPage;