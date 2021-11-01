'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('history', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      totalplay:{
        type: Sequelize.INTEGER,
      },
      win:{
          type: Sequelize.INTEGER,
      },
      draw:{
          type: Sequelize.INTEGER,
      },
      lose:{
          type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        References: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('history');
  }
};
