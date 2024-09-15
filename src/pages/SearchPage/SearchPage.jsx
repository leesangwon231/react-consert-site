import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Button, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import "./SearchPage.css";
import ListCulture from './component/ListCulture/ListCulture';
import ListCenter from './component/ListCenter/ListCenter';
import { useSearchCenters } from '../../hooks/useSearchCenter';
import { useSearchCultures } from '../../hooks/useSearchCultures';
import TextLoadingSpinner from "../../common/TextLoadingSpinner/TextLoadingSpinner";
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import SearchFilter from './component/SearchFilter/SearchFilter';
import { genreList } from '../../constants/constants';

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryKeyword = queryParams.get('q') || '';
    const queryGenres = queryParams.get('g') ? queryParams.get('g').split(',') : [];
    
    setKeyword(queryKeyword);
    setSelectedGenres(queryGenres);
  }, [location.search]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set('q', keyword);

    if (selectedGenres.length > 0) {
      newParams.set('g', selectedGenres.join(','));
    } else {
      newParams.delete('g');
    }

    navigate(`/search?${newParams.toString()}`, { replace: true });
  }, [keyword, selectedGenres, navigate]);

  const { data: cultureData, error: cultureError, isLoading: cultureLoading, isError: cultureIsError } = useSearchCultures({ shprfnm: keyword, shcate: selectedGenres });
  const { data: centerData, error: centerError, isLoading: centerLoading, isError: centerIsError } = useSearchCenters({ shprfnmfct: keyword });

  if (keyword && (cultureLoading || centerLoading)) {
    return <TextLoadingSpinner />;
  }

  if (keyword && (cultureIsError || centerIsError)) {
    return <ErrorBox message={cultureError?.message || centerError?.message} />;
  }

  const getGenreNameByCode = (code) => {
    const genre = genreList.find((g) => g.genreCode === code);
    return genre ? genre.genreName : code;
  };

  const searchByKeyword = (event) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      setKeyword(inputValue.trim());
      setInputValue("");
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const openFilterModal = () => {
    setShowFilter(true);
  };

  const closeFilterModal = () => {
    setShowFilter(false);
  };

  const handleApplyFilters = (genres) => {
    setSelectedGenres(genres);
  };

  const handleRemoveGenre = (genreCode) => {
    setSelectedGenres(selectedGenres.filter((code) => code !== genreCode));
  };

  return (
    <div className="search-container">
      <SearchFilter show={showFilter} onClose={closeFilterModal} onApplyFilters={handleApplyFilters} />
      {showAlert && (
        <div className="custom-alert active">
          <div className="alert-content">
            <p>검색어를 입력해 주세요</p>
            <button className="close-btn" onClick={handleAlertClose}>확인</button>
          </div>
        </div>
      )}
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
              <Button 
                className='btn-filter'
                onClick={openFilterModal}>
                <FontAwesomeIcon icon={faFilter} />
                <div className='filter-btn-text'> 필터 </div>
              </Button>
              <div className="input-container">
                <Form.Control
                  type="search"
                  className="me-2"
                  aria-label="Search"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
              </div>
              <Button type="submit" className="btn-srch" aria-label="Search">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <div className="Badge-container">
              {selectedGenres.map(genreCode => (
                <Badge key={genreCode} className="genre-badge">
                  {getGenreNameByCode(genreCode)}
                  <a href="#!" onClick={() => handleRemoveGenre(genreCode)}>x</a>
                </Badge>
              ))}
            </div>
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
          {keyword && (activeButton === "all" || activeButton === "culture") 
            ? <ListCulture data={Array.isArray(cultureData?.dbs?.db) ? cultureData.dbs.db : []} /> : null}
          {keyword && (activeButton === "all" || activeButton === "center") 
            ? <ListCenter data={Array.isArray(centerData?.dbs?.db) ? centerData.dbs.db : []} /> : null}
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;
