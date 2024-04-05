'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Lists', [{
        title: 'Ongoing',
        order: 1,
        boardId: 1,
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        title: 'Done',
        order: 2,
        boardId: 1,
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        title: 'Ongoing',
        order: 1,
        boardId: 2,
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        title: 'Done',
        order: 2,
        boardId: 2,
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
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
