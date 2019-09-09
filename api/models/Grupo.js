const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
};

const tableName = 'grupo';

const Grupo = sequelize.define('Grupo', {
  nome: {
    type: Sequelize.STRING,
  },
}, {
  hooks,
  tableName,
});

// eslint-disable-next-line
Grupo.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Grupo;
