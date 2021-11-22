import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getById } from '../../actions';
import { useParams } from 'react-router';


export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(()=>{
    dispatch(getById(id));
  },[]);
  const recipeById = useSelector((state) => state.recipeById);
   console.log(recipeById)
      return (
      <div >
       <h2>{`${recipeById.title}`}</h2>
      <img src={recipeById.image}/>
      <h4>{`Diets: "${recipeById.diets}"`}</h4>
      <h4>{`Spoonacular Score: ${recipeById.points}`}</h4>
      <h4>{`Health Score: ${recipeById.healthScore}`}</h4>
      <h4>Resume: <div dangerouslySetInnerHTML={{ __html: recipeById.summary }}/></h4>
      <h5>Steps: <div dangerouslySetInnerHTML={{ __html: recipeById.steps }}/></h5>
  </div>
  );
}