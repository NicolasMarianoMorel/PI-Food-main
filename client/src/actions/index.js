import axios from 'axios';
import {GET_ALL, GET_ALL_BY_TITLE, GET_TYPES, GET_SORTED, GET_BY_ID, POST_RECIPE} from"./constants";


export function getAll() {
      return async function(dispatch) {
      let apiCall = await axios.get("http://localhost:3001/recipes");
      let apiInfo = apiCall.data;
      return dispatch({type: GET_ALL, payload: apiInfo})
    }
  }
  export function getAllByTitle(title) {
    return async function(dispatch) {
    let apiCall = await axios.get(`http://localhost:3001/recipes?title=${title}`);
    let apiInfo = apiCall.data;
    return dispatch({type: GET_ALL_BY_TITLE, payload: apiInfo})
  }
}
export function getTypes() {
  return async function(dispatch) {
  let apiCall = await axios.get(`http://localhost:3001/types`);
  let apiInfo = apiCall.data;
  return dispatch({type: GET_TYPES, payload: apiInfo})
}
}
// in payload i will recive an objet with all the orden forms of my local states(HOME)
export function getSorted(payload) {
  return  function(dispatch) {
   return dispatch({type: GET_SORTED, payload})
}
}
export function getById(id) {
  return async function(dispatch) {
  let apiCall = await axios.get(`http://localhost:3001/recipes/${id}`);
  let apiInfo = apiCall.data;
  return dispatch({type: GET_BY_ID, payload: apiInfo})
}
}
// in payload i will recive an objet with all the information of my local states (FORM) to make my post 
export function postRecipe(payload) {
  return async function(dispatch) {
  const post = await axios.post(`http://localhost:3001/recipe`, payload);
  return post;
}
}
