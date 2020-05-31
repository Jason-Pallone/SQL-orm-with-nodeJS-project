const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false,
  // global options
  define: {
     //timestamps: false, --- this will disable the timestamps options for ALL tables because it is a global option
  }
});

const db = {
    sequelize,
    Sequelize,
    models: {}
};

db.models.Movie = require('./models/movie') (sequelize);
db.models.Person = require('./models/person') (sequelize);

module.exports = db;