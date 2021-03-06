import React,{ useState, useEffect } from 'react';
import Card from '../Card/Card.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByTitle } from '../../actions/index.js'; 
import { NavLink } from 'react-router-dom';
import style from "./Cards.module.css";
import img from "../img/loading.gif";

export default function Cards() {
  const recipes = useSelector((state) => state.recipes);
  const [search, setSearch] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [actualPage, setActualPage] = useState(1);
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
  const refreshPage = ()=>{ window.location.reload() }
  
  const nextPage = () => {
    if(actualPage < Math.ceil(recipes.length / 9)) {
      setCurrentPage(currentPage + 9)
      setActualPage(actualPage + 1)
    }
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
    <div className={style.container}>
      <div className={style.subContainer}>
            <input className={style.search}
            type="text" 
            placeholder="Search your recipe here..."
            onChange={(e) => onSearchChange(e)} />
            <button className={style.btnSearch} onClick={(e) => onSearchSubmit(e)}>Search</button>
            <button  onClick={refreshPage} className={style.btnSearch}> Reset filter </button>
            </div>
          <div className={style.subContainer}>
    <img src="https://img.icons8.com/fluency/50/000000/circled-chevron-left.png" className={style.icons}
    onClick={() => prevPage()}/> 
    <label className={style.actualPage}>{actualPage}</label>
    <img src="https://img.icons8.com/fluency/50/000000/circled-chevron-right.png" className={style.icons}
    onClick={() => nextPage()}/>

           </div>

      <div className={style.cards}>
      {filtereds ? filtereds.map((r) => {
          let dietsArray = function() {
          let aux = [];
           if(r.diets.length <= 0) return aux = "No diets available";
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
           
      return (
        <NavLink className={style.navLink} to={`/recipes/${r.id}`}> <Card 
        key={r.id}
        title={r.title}
        image={r.image}
        diets={dietsArray()}
        id={r.id}/>
        </NavLink>
      )}): <img className={style.loading} src={img}/>}
        </div>
      </div>
  );
}