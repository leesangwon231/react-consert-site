import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchPage.css";
import ListCulture from './component/ListCulture/ListCulture';
import ListCenter from './component/ListCenter/ListCenter';
import { useSearchCenters } from '../../hooks/useSearchCenter';
import { useSearchCultures } from '../../hooks/useSearchCultures';




const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [activeButton, setActiveButton] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryKeyword = queryParams.get('q');

    if (queryKeyword) {
      setKeyword(queryKeyword);
    }
  }, [location.search]);

  const { data: cultureData, error: cultureError, isLoading: cultureLoading } = useSearchCultures({ shprfnm: keyword });
  const { data: centerData, error: centerError, isLoading: centerLoading } = useSearchCenters({ shprfnmfct: keyword });

  if (keyword && (cultureLoading || centerLoading)) {
    return <div> Loding... </div>;
  }

  if (keyword && (cultureError || centerError)) {
    return <div>Error: {cultureError?.message || centerError?.message}</div>;
  }

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setKeyword(inputValue.trim());
      navigate(`/search?q=${inputValue.trim()}`);
      setInputValue("");
    } else {
      alert("검색어를 입력해 주세요");
    }
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
      <div className="search-container">
        <Container>
          <Row>
            <div className="search-box">
              <h1>
                {keyword ? (
                    <span className="keyword">' {keyword} ' </span>
                ) : (
                    "검색어를 입력하세요"
                )}
                {keyword ? '에 대한 검색 결과 입니다.' : ""}
              </h1>
              <Form className="d-flex search-form" onSubmit={searchByKeyword}>
                <div className="input-container">
                  <Form.Control
                      type="search"
                      className="me-2"
                      aria-label="Search"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                  />
                </div>
                <a
                    href="#"
                    onClick={searchByKeyword}
                    className="btn-srch"
                    aria-label="Search"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </Form>
            </div>
            <div className="button-group">
              <Button
                  className={`btn ${activeButton === "all" ? "active" : ""}`}
                  onClick={() => handleButtonClick("all")}
              >
                통합검색
              </Button>
              <Button
                  className={`btn ${activeButton === "culture" ? "active" : ""}`}
                  onClick={() => handleButtonClick("culture")}
              >
                공연
              </Button>
              <Button
                  className={`btn ${activeButton === "center" ? "active" : ""}`}
                  onClick={() => handleButtonClick("center")}
              >
                시설
              </Button>
            </div>
            {keyword && activeButton === "all" || activeButton === "culture" ? <ListCulture data={cultureData}/> : null}
            {keyword && activeButton === "all" || activeButton === "center" ? <ListCenter data={centerData}/> : null}
          </Row>
        </Container>
      </div>
  );
};

export default SearchPage;
