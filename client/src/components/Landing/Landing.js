import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


export default function Landing() {
  return (
  <div>
    <h1>soy Landing</h1>
    <Link to="/home"> ingresar</Link>
  </div>
);
}