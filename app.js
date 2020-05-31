const db = require('./db/index')
const { Movie, Person } = db.models;



(async () => {
/* Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement,
 which completely deletes the table each time the app is run. */

  await db.sequelize.sync({ force: true });


  try {

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
    //builds not create, build won't be stored in the DB unless the save() method is called on it.
      Movie.build({
        title: "Star Wars",
        runtime: 120,
        releaseDate: '2012-12-15',
        isAvailableOnVHS: false
      }).save(), /* Call the save() method to save this movie instance to the DB or it won't be stored. 
      save() validates the instance, and if the validation passes, it persists it to the database.
       save() also saves changed fields only -- it will do nothing if no fields changed. */
      Person.create({
        firstName: "Mark",
        lastName: "Jones"
    })
  ])
  .then((movies)=> {
    const moviesJSON = movies.map(movies => movies.toJSON())
    console.log(moviesJSON)
  });

  //CRUD OPERATIONS

  const movieById = await Movie.findByPk(1); //findByPk() is find by primary key, or the ID for example.
  console.log(movieById.toJSON());

  const movieByRuntime = await Movie.findOne({ where: { runtime: 90 }});
  //findOne takes an options object where you specify the attributes to search. In this case we did runtime.
  console.log(movieByRuntime.toJSON());

  const people = await Person.findAll({
    // SELECT * FROM People WHERE firstName = 'Mark' AND lastName = 'Jones';
    where: {
      firstName: 'Mark',
      lastName: 'Jones'
    }
  });
  console.log( people.map(person => person.toJSON()) );

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

