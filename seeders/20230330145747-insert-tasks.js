'use strict';
const { User } = require('../models');
const _ = require('lodash');

const generateTasks = (amount = 100) => {
  return new Array(amount > 500 ? 500 : amount)
    .fill(null)
    .map((_, i) => generateUser(i));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ['id'] });
    const tasks = users
      .map((user) => {
        return new Array(_.random(1, 10, false)).fill(null).map((_, i) => ({
          user_id: user.id,
          content: `content task ${i}`,
          created_at: new Date(),
          updated_at: new Date(),
        }));
      })
      .flat(2);

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
