import React, { useState, useEffect } from 'react';
import { connectAdvanced, useDispatch, useSelector } from 'react-redux'
import { getTypes, postRecipe } from '../../actions';
import { useNavigate } from 'react-router-dom';
import style from "./Form.module.css";

export default function  Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getTypes())
},[]);

  const dietTypes = useSelector(state => state.dietTypes)
  const [input, setInput] = useState({
    title: '',
    score: 0,
    healthScore: 0,
    dishTypes: "",
    image: "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
    summary: '',
    steps: "",
    diets: [],
  });
  const [errors, setErrors] = useState("");

  
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleCheckboxs = (e) => {
    if(e.target.checked){
      setInput({
      ...input,
      diets: [...input.diets, e.target.value]
      })
  }
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    alert("Recipe has been created sucessfully")
    dispatch(postRecipe(input))

      setInput({
      ...input,
      title: '',
      score: 0,
      healthScore: 0,
      dishTypes: "",
      image: "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
      summary: '',
      steps: "",
      diets: [],
      })
      navigate('../home');
    }
    
    return (
      <form className={style.container} >
           <h1>Create your own recipe</h1>
         <div>
          <label>Title:</label>
          <input type="text" name="title"
          placeholder="Write the title here..." 
          onChange={(e => handleInputChange(e))}/>
          {errors.title && (<p className={style.danger}>{errors.title}</p>)}
         </div>
         <div>
          <label>Score:</label>
          <input  type="number" name="score"
          placeholder="Write the score here..." 
          onChange={(e => handleInputChange(e))}/>
         </div>
        <div>
          <label>Health Score:</label>
          <input  type="number" name="healthScore"
          placeholder="Write the health score here..." 
          onChange={(e => handleInputChange(e))}/>
          {errors.healthScore && (<p className={style.danger}>{errors.healthScore}</p>)}
        </div>
        <div>
          <label>Dish Type:</label>
          <input  type="text" name="dishTypes"
          placeholder="Write the dish type here..." 
          onChange={(e => handleInputChange(e))}/>
        </div>
        <div>
           <label>Optional Image: </label>
          <input  type="text" name="image"
          placeholder="Write the image url here..." 
          onChange={(e => handleInputChange(e))}/>
          </div>
        <div>
         <div>
          <label>Dish Summary:</label>
          <textarea  type="text" name="summary"
          placeholder="Write the summary here..." 
          onChange={(e => handleInputChange(e))}/>
          {errors.summary && (<p className={style.danger}>{errors.summary}</p>)}
          </div>
          <label>Steps:</label>
          <textarea type="text" name="steps"
          placeholder="Write the steps here..." 
          onChange={(e => handleInputChange(e))}/>
            <div >
          <div className={style.subContainer}>
            {dietTypes && dietTypes.map(e => {return (<div className={style.prueba}
            key={e.id}>
            <label>{e.title}</label>
            <input 
            type="checkbox"
            value={e.title}
            name= {e.title}
            onChange={e => {handleCheckboxs(e)}} />
            </div>)})}
            </div>
          </div>
         </div>
        
        <button className={style.btn}
        onClick={(e) => handleOnSubmit(e)}
        type="submit" 
        disabled={errors.title || errors.healthScore || errors.summary}>Create Recipe</button>
       
       
      </form>
  )
}
export function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = 'Title is required';
  } else if (!/^[a-zA-Z]?\s?[a-zA-Z]/.test(input.title)) {
    errors.title = 'Title has to be an alphabetic value';
  }
  if (!input.healthScore) {
    errors.healthScore = 'Health Score is required';
  }
  if (!input.summary) {
    errors.summary = 'Summary is required';
  }
 
    return errors;
};