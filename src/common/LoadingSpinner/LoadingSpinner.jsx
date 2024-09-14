import React from 'react';
import SpinnerImage from "../../assets/Spinner.gif";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className='spinner-container'>
      <h3>잠시만 기다려주세요</h3>
      <img src={SpinnerImage} alt='로딩' className='spinner-image' />
    </div>
  );
}

export default LoadingSpinner;
