import React, { useState } from 'react';
import "./SearchFilter.css";
import { genreList } from '../../../../constants/constants';
import { Form, Row, Col, Button } from 'react-bootstrap';

const regions = [
  { code: "all", name: "전체" },
  { code: "11", name: "서울" },
  { code: "26", name: "부산" },
  { code: "27", name: "대구" },
  { code: "28", name: "인천" },
  { code: "29", name: "광주" },
  { code: "30", name: "대전" },
  { code: "31", name: "울산" },
  { code: "36", name: "세종" },
  { code: "41", name: "경기" },
  { code: "51", name: "강원" },
  { code: "43", name: "충북" },
  { code: "44", name: "충남" },
  { code: "45", name: "전북" },
  { code: "46", name: "전남" },
  { code: "47", name: "경북" },
  { code: "48", name: "경남" },
  { code: "50", name: "제주" }
];

const SearchFilter = ({ show, onClose, onApplyFilters }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  if (!show) return null;

  const handleCheckboxChange = (genreCode) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreCode)
        ? prevSelected.filter((code) => code !== genreCode)
        : [...prevSelected, genreCode]
    );
  };

  const handleLocationChange = (locationCode) => {
    setSelectedLocation((prevSelected) =>
      prevSelected.includes(locationCode)
        ? prevSelected.filter((code) => code !== locationCode)
        : [...prevSelected, locationCode]
    );
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    onApplyFilters({ genres: selectedGenres, locations: selectedLocation });
    onClose(); // 모달 닫기
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="search-filter-overlay" onClick={handleOverlayClick}>
      <div className="search-filter-modal">
        <h2>필터</h2>
        <Form onSubmit={handleApplyFilters}>
          <Row>
            <Col md={6}>
              <div className='check-genre'>
                <h5>장르</h5>
                <div className='check-genre-container'>
                  {genreList.map((genre) => (
                    <div key={genre.genreCode} className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          value={genre.genreCode}
                          checked={selectedGenres.includes(genre.genreCode)}
                          onChange={() => handleCheckboxChange(genre.genreCode)}
                        />
                        {genre.genreName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={6}>
              {/* <div className='check-local'>
                <h5>지역</h5>
                <div className='check-local-container'>
                  <div className='local-seperate'>
                    {regions.map((region) => (
                      <div key={region.code} className="checkbox-group">
                        <label>
                          <input
                            type="checkbox"
                            value={region.code}
                            checked={selectedLocation.includes(region.code)}
                            onChange={() => handleLocationChange(region.code)}
                          />
                          {region.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
            </Col>
          </Row>
          <div className='check-btn-area'>
            <Button className="btn-submit" type="submit">적용</Button>
            <Button className="btn-delete" onClick={onClose}>취소</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SearchFilter;
