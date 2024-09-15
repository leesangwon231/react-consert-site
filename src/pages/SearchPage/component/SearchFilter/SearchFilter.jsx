import React, { useState } from 'react';
import "./SearchFilter.css";
import { genreList } from '../../../../constants/constants';
import { Form, Row, Col, Button } from 'react-bootstrap';

const SearchFilter = ({ show, onClose, onApplyFilters }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  if (!show) return null;

  const handleCheckboxChange = (genreCode) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreCode)
        ? prevSelected.filter((code) => code !== genreCode)
        : [...prevSelected, genreCode]
    );
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    onApplyFilters(selectedGenres); // 선택한 장르를 부모 컴포넌트에 전달
    onClose(); // 모달 닫기
  };

  // 필터 오버레이를 클릭했을 때 모달을 닫는 핸들러
  const handleOverlayClick = (event) => {
    // 오버레이 클릭 시 모달 닫기
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
            {/* <Col md={6}>
              <div className='check-local'>
                <h5>지역</h5>
                <div className='check-local-container'>
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
            </Col> */}
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
