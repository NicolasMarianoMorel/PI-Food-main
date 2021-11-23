import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

export default function Landing() {
  return (
  <div className={style.container}>
    <h1 className={style.title}>Henry Food App</h1>
    <div className={style.subContainer}>
      <img src="https://i.pinimg.com/564x/ee/25/f8/ee25f8c60793e1d1bca1d67738626276.jpg" className={style.image}/>
     <div className={style.containerColumn}> 
       <h3 className={style.subTitle}>Your own cookbook</h3>
       <h3 className={style.subTitle}>Just a click away</h3>
    <Link to="/home"> <button className={style.btn}>Enter</button></Link>
    </div>
    </div>
  </div>
);
}