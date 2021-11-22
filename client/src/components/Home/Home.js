import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAll, getTypes, getSorted } from '../../actions/index.js';
import Cards from "../Cards/Cards.js";



export default function Home() {
const dispatch = useDispatch();
const recipes = useSelector((state) => state.recipes);
const allRecipes = useSelector((state) => state.allRecipes);
const dietTypes = useSelector((state) => state.dietTypes);
const [order, setOrder] = useState("Increasing");
const [type, setType] = useState("Alphabetical");
const [diets, setDiets] = useState("All");

  useEffect(()=>{
    dispatch(getAll());
    dispatch(getTypes())
},[]);

useEffect(()=>{
 (allRecipes.length) && dispatch(getSorted({
  order,
  type,
  diets
}))
},[allRecipes]);

const orderChange = (e) => {
  e.preventDefault();
  setOrder(e.target.value);
}
const typeChange = (e) => {
  e.preventDefault();
  setType(e.target.value);
}
const dietsChange = (e) => {
  e.preventDefault();
  setDiets(e.target.value);
}
function handleSubmit(event){
  event.preventDefault();
  dispatch(getSorted({
    order,
    type,
    diets
  }))
}

  return (
  <div>
    <div>
          <select  name="order" onChange={e => orderChange(e)}>
             <option value="Increasing">Increasing</option>
             <option value="Decreasing">Decreasing</option>
          </select>
          <select  name="type" onChange={e => typeChange(e)}>
             <option value="Alphabetical">Alphabetical</option>
             <option value="Score">Score</option>
          </select>
          <select  name="diets" onChange={e => dietsChange(e)}>
          <option value="All">All</option>{
            dietTypes && dietTypes.map(el => {return <option value={el.title}>{el.title}</option>})
          }
          </select>
          <button type="submit" onClick={event => {handleSubmit(event)}}>Reload</button>
 </div>
   <Cards/>
  </div>
);
}