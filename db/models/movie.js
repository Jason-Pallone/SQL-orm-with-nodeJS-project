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
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"'
        },
        // The isAfter validator checks that a date string holds a date value that is after or equal to a given date.
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a date later than or equal to 12-28-1895 for "releaseDate"'
        }
      }
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false, // disallow null
      defaultValue: false // set default value
    },
  }, ({
     paranoid: true, 
     /*Setting the paranoid option to true means that a destroyed record will not be physically
      deleted from the database, but it will also not be returned in future queries.*/
     sequelize 
    }))

  return Movie;
};