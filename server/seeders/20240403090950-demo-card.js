'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Cards', [{
      title: 'Task1',
      order: 1,
      listId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Task2',
      order: 2,
      listId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
