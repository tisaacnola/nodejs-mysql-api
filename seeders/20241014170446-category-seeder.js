"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("categories", [
      {
        name: "NodeJS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VueJs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ReactJs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ReactNative",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laravel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Flutter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("categories", {}, null);
  },
};
