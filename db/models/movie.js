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
  }, ({ sequelize }))

  return Movie;
};