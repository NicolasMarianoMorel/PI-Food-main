/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diets, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  healthScore: 10,
  summary: "una prueba",
};
const diets = [
  "vegetarian",
  "vegan"
]

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
      
    /* describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should return a json', () =>
      agent.get('/recipes').then((res) => {
        expect("Content-Type", /json/)
      }));
    it('should get 200 when searching with a recipe name', () =>
      agent.get('/recipes?title=Milanesa').expect(200)
    ); */
        
    beforeEach(() => Diets.sync({ force: true }));
  describe('GET /types', () => {
    it('response should be 200', () =>{
      return agent.get('/types').expect(200)
  })
  });
    it('diets should have length of 11', () =>{
    return agent.get('/types').expect(200).then(types=>{
    expect(types.body).to.have.lengthOf(11);
   })
});
it('position 3 should be vegetarian', () =>{
  return agent.get('/types').expect(200).then(types=>{
  expect(types.body[3]).to.have.property("title").to.equal("vegetarian")
 })
});

});

/* }); */
