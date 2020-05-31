const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a valid value for first name."
          },
          notEmpty: {
            msg: "Please enter a valid value for first name."
          }
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a valid value for last name."
          },
          notEmpty: "Please enter a valid value for last name."
        }
      }
    }, ({sequelize}))

    return Person;
};
