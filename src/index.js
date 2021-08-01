import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const loader = document.querySelector(".preloader");

const showLoader = () => loader.classList.remove("preloader");
const addClass = () => loader.classList.add("d-none");
    setTimeout(
      ()=>{
        showLoader();
        addClass();
  ReactDOM.render(<App />, document.getElementById('root'));

      },6000
    )


