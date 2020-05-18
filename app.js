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
      releaseDate: 2001-11-22,
      isAvailableOnVHS: true
    }),
      Movie.create({
      title: "Lion King",
      runtime: 90,
      releaseDate: 1998-12-10,
      isAvailableOnVHS: true
    })
  ]);
    
  const moviesJSON = movieInstances.map(movie => movie.toJSON());

  console.log(moviesJSON)

    console.log('Connection successful!')
  } catch (error) {
      console.error(`Error connecting to the database: ${error}`)

  }
  
}) ();



