const db = require('../db/index')
const { Movie } = db.models;
const { Op } = db.Sequelize; //Op (Operators) property from Sequelize.

const express = require('express');
const router = express.Router();


function errorHandler(error, cb){
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(err => err.message);
     return errors;
  } else {
    throw error;
  }
}


router.post('/create', async(req, res) => {
  await Movie.create(req.body)
   .then(() => res.json("Movie Created"))
   .catch(err =>{ console.log(err)
    res.status(401).json(errorHandler(err))
   })
})

router.get('/retrieve-movies', async(req, res) => {
    await Movie.findAll()
      .then( (movies) => res.json(movies) )
      .catch( err => console.error(err) );
  });


router.post('/search-for-movie', async(req, res) => {
  await Movie.findAll({
    where: { 
      title: { [Op.like]: '%' + req.body.movieTitle + '%' }
    }
  })
  .then( movie => res.json(movie) )
  .catch( err => console.error(err) );
});


router.put('/update-movie', async(req, res) => {
    const movieToUpdate = await Movie.findByPk(req.body.movieToUpdateID);
    await movieToUpdate.update(req.body)
      .then(() => res.json("Movie updated!"))
      .catch( err => console.error(err) );
  });
  

router.post('/delete', async(req, res) => {
     const movieToDelete = await Movie.findByPk(req.body.movieToDeleteID);
     await movieToDelete.destroy()
       .then(() => res.json("Movie deleted!"))
       .catch( err => console.error(err) );
  });

module.exports = router;