import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


export default function Card({title, image, diets}) {
 
  return (
  <div>
    <h2>{title}</h2>
    <img src={image}/>
    <h4>{diets}</h4>
  </div>
);
}