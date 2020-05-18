const Sequelize = require('sequelize');

//Instantiate Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  // logging: false, this disables logging of SQL statements
});


class Movie extends Sequelize.Model {}
Movie.init({

  title: Sequelize.STRING

}, { sequelize });

(async () => {
/* Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement,
 which completely deletes the table each time the app is run. */

  await sequelize.sync({ force: true });


  try {
    await sequelize.authenticate();

    // Instance of the Movie class represents a database row
    const movieInstances = await Promise.all([
      Movie.create({
      title: "Star Wars",
    }),
      Movie.create({
      title: "Lion King",
    })
  ]);
    
  const moviesJSON = movieInstances.map(movie => movie.toJSON());

  console.log(moviesJSON)

    console.log('Connection successful!')
  } catch (error) {
      console.error(`Error connecting to the database: ${error}`)

  }
  
}) ();



