import React from 'react'
import "./ContentsPage.css"
import {useContents} from "../../hooks/getContents.jsx";

const ContentsPage = () => {

    const tests = useContents();
    console.log(tests)

    return (
        <div>ContentsPage</div>
    )
}

export default ContentsPage;