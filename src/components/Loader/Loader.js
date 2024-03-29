import React from 'react';
import {loader} from "../../utils/images";
import "./Loader.css";

const Loader = () => {
  return (
    <div className='container'>
      <div className='loader flex justify-center align-center'>
        <img src = {loader} alt = "" />
      </div>
    </div>
  )
}

export default Loader
