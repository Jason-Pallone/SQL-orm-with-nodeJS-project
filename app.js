const db = require('./db');
const { Movie } = db.models;


(async () => {
/* Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement,
 which completely deletes the table each time the app is run. */

  await db.sequelize.sync({ force: true });


  try {

    // Instance of the Movie class represents a database row
    const movieInstances = await Promise.all([
      Movie.create({
      title: "Star Wars",
      runtime: 81,
      releaseDate: '2001-11-22',
      isAvailableOnVHS: true
    }),
      Movie.create({
      title: "Lion King",
      runtime: 90,
      releaseDate: '1998-12-10',
      isAvailableOnVHS: true
    })
  ]);
    
  const moviesJSON = movieInstances.map(movie => movie.toJSON());

  console.log(moviesJSON)

    console.log('Connection successful!')
  } catch (error) {
      console.error(`Error connecting to the database: ${error}`)

      if(error.name === 'SequelizeValidationError') {
        const errorList = error.errors.map(err => err.message);
        /* This displays the error messages we created in our movies.js file, for the isAfter, min 
         etc.. those properties, The error thrown by Sequelize contains an errors property,
         which is an array with 1 or more ValidationErrorItems, we access that property above using 
         error.errors.map, to acess our personal error messages for each validation error thrown*/
        console.error(`Validation errors: ${errorList}`);
      } else {
        throw error;
      }

  }
  
}) ();


