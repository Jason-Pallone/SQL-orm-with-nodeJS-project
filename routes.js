const db = require('./db/index')
const { Movie, Person } = db.models;
const { Op } = db.Sequelize; //Op (Operators) property from Sequelize.

const express = require('express');
const router = express.Router();


router.post('/create', async(req, res) => {
     await Movie.create(req.body)
      .then(() => res.json("Movie Created"))
  });


router.get('/retrieve-movies', async(req, res) => {
    await Movie.findAll()
      .then( (movies) => res.json(movies) )
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
  });
  

router.post('/delete', async(req, res) => {
     const movieToDelete = await Movie.findByPk(req.body.movieToDeleteID);
     await movieToDelete.destroy()
       .then(() => res.json("Movie deleted!"));
  });

module.exports = router;