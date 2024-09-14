import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ContentsPage.css";
import AllContents from "./component/AllContents/AllContents.jsx";
import MyLocationContents from "./component/MyLocationContents/MyLocationContents.jsx";
import { useParams } from "react-router-dom";
import { useContents } from "../../hooks/useContents.jsx";

const ContentsPage = () => {

    let params = useParams();

    let performanceKinds = ["콘서트", "CCCD"];
    if (params.category === "musical") {
        performanceKinds = ["뮤지컬", "GGGA"];
    } else if (params.category === "classical") {
        performanceKinds = ["클래식/무용", "BBBC"];
    } else if (params.category === "play") {
        performanceKinds = ["연극", "AAAA"];
    } else if (params.category === "concert") {
        performanceKinds = ["콘서트", "CCCD"];
    } else {
        return <Navigate to="/contents/concert" />;
    }

    // 필터링을 위한 데이터
    const [originData, setOriginData] = useState([]);
    const [idArray, setIdArray] = useState([]);

    // 정렬 값
    const [performanceSort, setPerformanceSort] = useState({});
    // 필터링 값
    const [performanceState, setPerformanceState] = useState({});

    // 페이지네이션
    const [page, setPage] = useState(1);

    const [param, setParam] = useState({
        shprfnm: "",
        signgucode: "",
        prfstate: "",
        shcate: performanceKinds[1],
        page: 1,
    });

    // 화면 뿌릴 데이터
    const { data, isLoading } = useContents(param);

    // 초기데이터 세팅
    useEffect(() => {
        // api에서 1개만 있으면 배열에 안 넣어 주어서 배열처리
        let originFilterData = data?.dbs?.db ? (Array.isArray(data.dbs.db) ? [...data.dbs.db] : [data.dbs.db]) : [];

        setIdArray(data?.dbs?.db);

        // 공연 상태 필터링
        if (Object.keys(performanceState).length !== 0) {
            originFilterData = originFilterData.filter((performance) => {
                return performance.prfstate.includes(Object.values(performanceState)[0]);
            });
        }

        // 정렬
        if (Object.keys(performanceSort)[0] === "01") {
            originFilterData = sortedWord(originFilterData);
        } else if (Object.keys(performanceSort)[0] === "02") {
            originFilterData = sortedLatest(originFilterData);
        }

        // 최종데이터 세팅
        setOriginData(originFilterData);
    }, [data, performanceState, performanceSort]);

    useEffect(() => {
        if (param.shcate !== performanceKinds[1] || param.page !== page) {
            setParam((prevParam) => ({
                ...prevParam,
                shcate: performanceKinds[1],
                page: page,
            }));
        }
    }, [page, performanceKinds]);

    const ctprvn = {
        "서울특별시": 11, "부산광역시": 26, "대구광역시": 27,
        "인천광역시": 28, "광주광역시": 29, "대전광역시": 30,
        "울산광역시": 31, "세종특별자치시": 36, "경기도": 41,
        "강원특별자치도": 42, "충청북도": 43, "충청남도": 44,
        "전라북도": 45, "전라남도": 46, "경상북도": 47,
        "경상남도": 48, "제주특별자치도": 50
    };

    const sortedState = {
        "가나다순": "01", "최신순": "02"
    };

    const perFormanceState = {
        "공연예정": "01", "공연중": "02", "공연완료": "03",
    };

    let performanceFilterArray = [ctprvn, sortedState, perFormanceState];

    performanceFilterArray = performanceFilterArray?.map((state) =>
        Object.entries(state).map((data) => {
            return { [data[1]]: data[0] };
        })
    );

    const sortedWord = (unSortedData) => {
        return unSortedData.sort((a, b) => a.prfnm.localeCompare(b.prfnm));
    };

    const sortedLatest = (unSortedData) => {
        return unSortedData.sort((a, b) => {
            a = a.prfpdfrom.split('.').join('');
            b = b.prfpdfrom.split('.').join('');
            return b.localeCompare(a);
        });
    };

    return (
        <div className={"ContentsPage_Container"}>
            <AllContents performanceFilterArray={performanceFilterArray}
                         performanceKinds={performanceKinds}
                         idArray={idArray}
                         performanceState={performanceState}
                         setPerformanceState={setPerformanceState}
                         performanceSort={performanceSort}
                         setPerformanceSort={setPerformanceSort}
                         isLoading={isLoading}
                         originData={originData}
                         page={page}
                         setPage={setPage}
            />
            <MyLocationContents ctprvn={ctprvn} performanceKinds={performanceKinds} />
        </div>
    );
};

export default ContentsPage;