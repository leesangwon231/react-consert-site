import React from 'react';
import "./ContentFilter.css"


const ContentFiler = ({performanceFilterArray,ctprvnFlag,setCtprvnFlag,performanceKind,setPerformanceKind,performanceState,setPerformanceState}) => {


    const onClickCtprvn = (index) => {
        const selectedKey = Object.keys(performanceFilterArray[0][index])[0];
        if (ctprvnFlag === selectedKey) {
            setCtprvnFlag(null);
        } else {
            setCtprvnFlag(selectedKey);
        }
    }

    const onClickPerformanceKind = (index) => {
        const selectedKey = Object.keys(performanceFilterArray[1][index])[0];
        if (performanceKind === selectedKey) {
            setPerformanceKind(null);
        } else {
            setPerformanceKind(selectedKey);
        }
    }


    const onClickPerformanceState= (index) => {
        const selectedKey = Object.keys(performanceFilterArray[2][index])[0];
        if (performanceState === selectedKey) {
            setPerformanceState(null);
        } else {
            setPerformanceState(selectedKey);
        }
    }


    return (
        <div className={"ContentsPage_FilterArea_Container"}>
            <div className={"ContentsPage_FilterArea_Wrapper"}>
                <div className={"ContentsPage_FilterArea_PerState"}>
                    <p>공연종류</p>
                    <div className={"ContentsPage_FilterArea_StateInfoWrapper"}>
                        {performanceFilterArray[1]?.map((performance, index) => (
                            <div
                                className={performanceKind === Object.keys(performance)[0] ? "ContentsPage_FilterArea_Flag_active" : "ContentsPage_FilterArea_Flag"}
                                key={index} onClick={() => onClickPerformanceKind(index)}>
                                {Object.values(performance)[0]}</div>
                        ))}
                    </div>
                    <p>공연상태</p>
                    <div className={"ContentsPage_FilterArea_StateInfoWrapper"}>
                        {performanceFilterArray[2]?.map((state, index) => (
                            <div
                                className={performanceState === Object.keys(state)[0] ? "ContentsPage_FilterArea_Flag_active" : "ContentsPage_FilterArea_Flag"}
                                key={index} onClick={() => onClickPerformanceState(index)}>
                                {Object.values(state)[0]}</div>
                        ))}
                    </div>
                </div>
                <div className={"ContentsPage_FilterArea_Ctprvn"}>
                    <p>지역별</p>
                    <div className={"ContentsPage_FilterArea_InfoWrapper"}>
                        {performanceFilterArray[0]?.map((ctprvn, index) => (
                            <div
                                className={ctprvnFlag === Object.keys(ctprvn)[0] ? "ContentsPage_FilterArea_Flag_active" : "ContentsPage_FilterArea_Flag"}
                                key={index} onClick={() => onClickCtprvn(index)}>
                                {Object.values(ctprvn)[0]}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentFiler;