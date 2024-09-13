import React, {useState} from 'react';
import "./ContentFilter.css"


const ContentFiler = ({performanceFilterArray,performanceState,setPerformanceState,performanceSort,setPerformanceSort}) => {


    const [visibleFlag,setVisibleFlag] = useState(false);


    const onClickVisible = () => {
        setVisibleFlag(!visibleFlag);
    }


    const onClickPerformanceState= (index) => {
        let selectedKey = performanceFilterArray[2][index];
        if (performanceState === selectedKey) {
            setPerformanceState({});
        } else {
            setPerformanceState(selectedKey);
        }
    }

    const onClickPerformanceSort= (index) => {
        let selectedSortKey = performanceFilterArray[1][index];
        if (performanceSort === selectedSortKey) {
            setPerformanceSort({});
        } else {
            setPerformanceSort(selectedSortKey);
        }
    }


    return (
        <div className={"ContentsPage_FilterArea"}>
            <div className={"ContentsPage_Filter_Wrapper"}>
                <div className={"ContentsPage_Filter_ButtonArea"}>
                    <div className={`ContentsPage_Filter_Button ${visibleFlag ? "active" : ""}`} onClick={onClickVisible}>{visibleFlag ? "닫기" : "필터"}</div>
                </div>
            </div>
            <div className={visibleFlag ? "ContentsPage_FilterArea_Container_active" : ""}>
                <div
                    className={visibleFlag ? "ContentsPage_FilterArea_Wrapper" : "ContentsPage_FilterArea_Wrapper_UnVisible"}>
                    <div className={"ContentsPage_FilterArea_PerState"}>
                        <p>공연상태</p>
                        <div className={"ContentsPage_FilterArea_StateInfoWrapper"}>
                            {performanceFilterArray[2]?.map((state, index) => (
                                <div
                                    className={Object.keys(performanceState)[0] === Object.keys(state)[0] ? "ContentsPage_FilterArea_Flag_active" : "ContentsPage_FilterArea_Flag"}
                                    key={index} onClick={() => onClickPerformanceState(index)}>
                                    {Object.values(state)[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={"ContentsPage_FilterArea_PerState"}>
                        <p>정렬</p>
                        <div className={"ContentsPage_FilterArea_StateInfoWrapper"}>
                            {performanceFilterArray[1]?.map((sortName, index) => (
                                <div
                                    className={Object.keys(performanceSort)[0] === Object.keys(sortName)[0] ? "ContentsPage_FilterArea_Flag_active" : "ContentsPage_FilterArea_Flag"}
                                    key={index} onClick={() => onClickPerformanceSort(index)}>
                                    {Object.values(sortName)[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

</div>
)
    ;
}

export default ContentFiler;