import React from 'react';
import style from "./Card.module.css";

export default function Card({title, image, diets}) {
 
  return (
  <div className={style.card}>
    <h2>{title}</h2>
    <img src={image} alt="not found"/>
    <h4>{diets}</h4>
  </div>
);
}