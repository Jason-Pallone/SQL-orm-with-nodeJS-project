const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "Title"'
        },
        // The notEmpty validator makes it so that the value cannot be an empty string
        notEmpty: {
          msg: 'Please provide a value for "Title"'
        }
       
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"'
        },
        // The min validator checks that a number value is greater than or equal to a given number
        min: {
          args: 1,
          msg: 'Please provide a value that is greater than "0" for "runtime"'
        },
      },
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "Rating"'
        },
        // The min validator checks that a number value is greater than or equal to a given number
        min: {
          args: 1,
          msg: 'Please provide a value that is greater than "0" for "Rating"'
        },
        max: {
          args: 10,
          msg: 'Please provide a value between 1 and 10 for "Rating"'
        },
      },
    },
    review: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "Review"'
        },
        // The notEmpty validator makes it so that the value cannot be an empty string
        notEmpty: {
          msg: 'Please provide a value for "Review"'
        }
      },
    },
  }, ({
     paranoid: true, 
     /*Setting the paranoid option to true means that a destroyed record will not be physically
      deleted from the database, but it will also not be returned in future queries.*/
     sequelize 
    }))

  return Movie;
};