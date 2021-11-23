import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getById } from '../../actions';
import { useParams } from 'react-router';
import style from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(()=>{
    dispatch(getById(id));
  },[]);
  const recipeById = useSelector((state) => state.recipeById);
   
      return (
      <div className={style.container} >
       <h2>{`${recipeById.title}`}</h2>
        <div className={style.subContainer}>
          <img src={recipeById.image} alt="not found"/>
          <div className={style.columnContainer}>
            <h4>{`Diets:   "${recipeById.diets}."`}</h4>
            <h4>{`Spoonacular Score: "${recipeById.points}".`}</h4>
            <h4>{`Health Score: "${recipeById.healthScore}"".`}</h4>
            <h4>{`Dish Types: "${recipeById.dishTypes}."`}</h4>
          </div>
       </div>
      <h4 className={style.summaryStep}>Resume: <div dangerouslySetInnerHTML={{ __html: recipeById.summary }}/></h4>
      <h4 className={style.summaryStep}>Steps: <div dangerouslySetInnerHTML={{ __html: recipeById.steps }}/></h4>
  </div>
  );
}