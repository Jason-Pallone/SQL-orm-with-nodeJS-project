const db = require('./db/index')
const { Movie, Person } = db.models;
const { Op } = db.Sequelize; //Op (Operators) property from Sequelize.



(async () => {
/* Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement,
 which completely deletes the table each time the app is run. */

  await db.sequelize.sync({ force: true });


  try {

    // CREATE

    // Instance of the Movie class represents a database row
    const movieInstances = await Promise.all([
    // Create, will create and save an instance all at once, its good for an express POST route handler, for example.
      Movie.create({
        title: "Toy Story",
        runtime: 81,
        releaseDate: '2001-11-22',
        isAvailableOnVHS: true
    }),
      Movie.create({
        title: "Lion King",
        runtime: 90,
        releaseDate: '1998-12-10',
        isAvailableOnVHS: true
    }),
      Movie.create({
        title: "Star Wars",
        runtime: 120,
        releaseDate: '2012-12-15',
        isAvailableOnVHS: false
      }),
      Person.create({
        firstName: "Mark",
        lastName: "Jones"
    })
  ])
  .then((movies)=> {
    const moviesJSON = movies.map(movies => movies.toJSON())
    console.log(moviesJSON)
  });


  //RETRIEVE
 
  const people = await Person.findAll({
    // SELECT * FROM People WHERE firstName = 'Mark' AND lastName = 'Jones';
    where: {
      firstName: 'Mark',
      lastName: 'Jones'
    }
  });
  console.log( people.map(person => person.toJSON()) );

  const movies = await Movie.findAll({
    attributes: ['id', 'title'], // return only ID and Title of the movie
    where: {
        releaseDate: {
          [Op.gte]: '2000-01-01' // Op.gte means greater than or equal to the date
        }
    },
    order: [['id', 'DESC']] 
    /*The order value is an array of arrays because you could order by multiple attributes (columns).
     Each array includes the attribute you want to order by and in which order, 
     ASCending or DESCending. In this case we're ordering by IDs in DESCending order. */
  });
  console.log( movies.map(movie => movie.toJSON()) );


  //UPDATE

  const starWars = await Movie.findByPk(3); // Find the movie with a primary key (ID) of 3

  await starWars.update({
    title: "Clone Wars", // Title update will be ignored due to the fields property
    runtime: 125
  }, {fields: ['runtime']}); // Fields property determines what is and is not allowed to be updated
  console.log(starWars.get({ plain: true })) // starWars.get({ plain: true })) returns the same as .toJSON()


  // DELETE

  const toyStory = await Movie.findByPk(1);

  await toyStory.destroy(); // Deletes movie record 

  const movieList = await Movie.findAll();
  console.log( movieList.map(movie => movie.toJSON()) ); // Display list of all current movie records

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

