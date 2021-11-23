const {Router} = require('express');
const axios = require('axios');
const { Recipe, Diets } = require('../db.js');
const {Op, INTEGER, UUID} = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  API_KEY, SECAPI_KEY, TERAPI_KEY, CUARAPI_KEY, QUINAPI_KEY, SECTAPI_KEY, SEPTAPI_KEY, OCTAPI_KEY
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get(`/recipes`, async function(req, res){
  try{
  const {title} = req.query;
 
  let getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title || ""}&number=100&addRecipeInformation=true&apiKey=${SECTAPI_KEY}`);
  //me quedo con los datos brutos en un array
  let apiData= getApiCall.data.results
  //me quedo solo con la informacion que necesito
  let receta = apiData.map(el => {
      return {
        vegetarian: el.vegetarian,
        id: el.id,
      diets: el.diets,
      title: el.title,
      summary: el.summary,
      points: el.spoonacularScore,
      healthScore: el.healthScore,
      steps: el.analyzedInstructions,
      image: el.image
  }})
  let getDbInfo = async () => {
    if(title) {
      return await Recipe.findAll({
        where: {
          title: {
            [Op.iLike] : `%${title}%`
    }}, include: {
      model: Diets,
      attributes: ["title"],
      through: {attributes: []}
    } 
  })}
  else {
    return await Recipe.findAll({
      include: { model: Diets,
        attributes: ["title"],
        through: {attributes: []}}
    })
  }
}
/* let infoDb = {
  id: dbInfo.dataValues.id,
  title: dbInfo.dataValues.title,
  summary: dbInfo.dataValues.summary,
  points: dbInfo.dataValues.points,
  healthScore: dbInfo.dataValues.healthScore,
  image: dbInfo.dataValues.image,
  createdInDb: dbInfo.dataValues.createdInDb,
  diets: dbInfo.dataValues.diets.map(el => {
    return el.title
  })
} */
const getAll = async () => {
  let apiInfo = receta;
  let dbInfo = await getDbInfo();
    const info = dbInfo.concat(apiInfo);
     info ? res.json(info) : res.status(401).send("Recipe not found")
  }
  getAll();
 }
catch(error) {
  res.status(404).send(error)
}
});
//---------------------------------------------------------------------------------------
  router.get(`/recipes/:id`, async function(req, res){
  
    const {id} = req.params;
    
    try {
      if (id.length < 20) {
      let getApiCall =  await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SECTAPI_KEY}`);
      let apiInfo = getApiCall.data
      let receta = {
        dishTypes: apiInfo.dishTypes,
        vegetarian: apiInfo.vegetarian,
        id: apiInfo.id,
        diets: apiInfo.diets,
        title: apiInfo.title,
        summary: apiInfo.summary,
        points: apiInfo.spoonacularScore,
        healthScore: apiInfo.healthScore,
        steps: apiInfo.instructions,
        image: apiInfo.image
        }
      res.json(receta)
    } 
    else {
      let dbInfo = await Recipe.findOne({
        where: {
          id: id
        }, 
        include: {
        model: Diets,
        attributes: ["id", "title"],
        through: {attributes: []}
        }})
      let infoDb = {
          id: dbInfo.dataValues.id,
          title: dbInfo.dataValues.title,
          steps: dbInfo.dataValues.steps,
          summary: dbInfo.dataValues.summary,
          points: dbInfo.dataValues.points,
          healthScore: dbInfo.dataValues.healthScore,
          image: dbInfo.dataValues.image,
          createdInDb: dbInfo.dataValues.createdInDb,
          diets: dbInfo.dataValues.diets.map(el => {
            return el.title
          })
        }
       
      res.json(infoDb)
    }
  }
    catch(error){
      res.status(404).send(error)
    }
 });
 //---------------------------------------------------------------------------------------
  router.get(`/types`, async function(req, res){
     try{  
          const types = await Diets.findAll()
          if (types.length === 0) {
            const types = await Diets.bulkCreate([
              {title : "dairy free"},
              {title : "gluten free"},
              {title : "ketogenic"},
              {title : "vegetarian"},
              {title : "lacto ovo vegetarian"},
              {title : "vegan"},
              {title : "pescatarian"},
              {title : "paleolithic"},
              {title : "primal"},
              {title : "fodmap friendly"},
              {title : "whole 30"},
          ]);
          res.json(types)
          }
          res.json(types);
        }
    catch(error) {
      res.status(401).send(error)
    }
  });
//---------------------------------------------------------------------------------------
router.post('/recipe', async function(req, res){
   try {
      const {title, summary, score, healthScore, steps, image, createdInDb, diets} = req.body;
     
     let recipeCreated = await Recipe.create({
          title,
          summary,
          points: score,
          healthScore,
          steps,
          image,
          createdInDb
      })
      let dietTypesDb = await Diets.findAll({
        where: {title : diets}
      })
      recipeCreated.addDiets(dietTypesDb)
      res.send(`Recipe "${title}" successfully created.`)
    }
  catch(error){
    res.status(401).send(error)
  }
});
    
module.exports = router;
