import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postRecipe } from '../../actions';
import { Link } from 'react-router-dom';

export default function  Form() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTypes())
},[]);

  const dietTypes = useSelector(state => state.dietTypes)
  const [input, setInput] = useState({
    title: '',
    score: 0,
    healthScore: 0,
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
      image: "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
      summary: '',
      steps: "",
      diets: [],
      })
    }
    
    return (
      <form className="container" onSubmit={(e) => handleOnSubmit(e)}>
           <h1>Create your own recipe</h1>
         <div>
          <label>Title:</label>
          <input className= {errors.title && "danger"} type="text" name="title"
          placeholder="Write the title here..." 
          onChange={(e => handleInputChange(e))}/>
          {errors.title && (<p className="danger">{errors.title}</p>)}
         </div>
         <div>
           <label>Optional Image:</label>
          <input  type="text" name="image"
          placeholder="Write the image url here..." 
          onChange={(e => handleInputChange(e))}/>
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
        </div>
        <div>
         <div>
          <label>Dish Summary:</label>
          <textarea  type="text" name="summary"
          placeholder="Write the summary here..." 
          onChange={(e => handleInputChange(e))}/>
          </div>
          <label>Steps:</label>
          <textarea type="text" name="steps"
          placeholder="Write the steps here..." 
          onChange={(e => handleInputChange(e))}/>
          <div>
            {dietTypes && dietTypes.map(e => {return (<div key={e.id}>
            <label>{e.title}</label>
            <input type="checkbox"
            value={e.title}
            name= {e.title}
            onChange={e => {handleCheckboxs(e)}} />
            </div>)})}
          </div>
         </div>
        
        <Link to="/home"><button type="submit" disabled={errors.title}>Create Recipe</button></Link>
       
       
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
 
    return errors;
};