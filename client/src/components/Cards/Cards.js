import React,{ useState, useEffect } from 'react';
import Card from '../Card/Card.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByTitle } from '../../actions/index.js'; 
import { NavLink } from 'react-router-dom';

export default function Cards() {
  const recipes = useSelector((state) => state.recipes);
  const [search, setSearch] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [actualPage, setActualPage] = useState(0);
  const dispatch = useDispatch();
  
     const filteredRecipes = () => {
      if (searchSubmit.length === 0) {
        return (recipes.length) && recipes.slice(currentPage, currentPage + 9)
      }
    else{
      dispatch(getAllByTitle(searchSubmit));
      setSearchSubmit("");
      return (recipes.length) && recipes.slice(currentPage, currentPage + 9)
    }
  }
  const filtereds = filteredRecipes();
  
  const nextPage = () => {
        setCurrentPage(currentPage + 9)
        setActualPage(actualPage + 1)
  }
  const prevPage = () => {
    if(currentPage > 0) {
      setActualPage(actualPage - 1)
      setCurrentPage(currentPage - 9)
    } 
  }
  
  const onSearchChange = (event) => {
     setSearch(event.target.value);
    
  }
  const onSearchSubmit = (event) => {
    setCurrentPage(0); 
    setSearchSubmit(search);
    setSearch("");
  }
  
  return (
    <div >
          <div>
            <input type="text" 
            placeholder="Search your recipe here"
            onChange={(e) => onSearchChange(e)} />
            <button onClick={(e) => onSearchSubmit(e)}>Search</button>
           </div>
      <button onClick={() => prevPage()}>Previous Page</button>
      &nbsp;
      <button>{actualPage}</button>
      &nbsp;
      <button onClick={() => nextPage()}>Next Page</button>
      {filtereds ? filtereds.map((r) => {
          let dietsArray = function() {
          let aux = [];
           if(r.diets.length <= 0) return aux = "No incluye dietas";
          else if(r.diets[0].title){
            aux = r.diets.map(el => {
            return el.title
            })
            return aux.join(", ");
          }
          else{ 
            aux = r.diets;
            return aux.join(", ");
           } 
        }
           
      return (<NavLink to={`/recipes/${r.id}`}> <Card 
          key={r.id}
          title={r.title}
          image={r.image}
          diets={dietsArray()}
          id={r.id}
        /></NavLink>)}): <p>Loading...</p>}
      </div>
  );
}