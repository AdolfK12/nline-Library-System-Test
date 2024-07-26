"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          is: /^[a-zA-Z0-9._-]+@(gmail|hotmail|yahoo|outlook)\.com$/,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isValidPassword(value) {
            if (
              !value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/)
            ) {
              throw new Error(
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number without any special characters."
              );
            }
          },
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
