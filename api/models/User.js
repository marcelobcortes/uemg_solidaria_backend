const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const Grupo = require('./Grupo');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.usu_password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  usu_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usu_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [4, 255],
      isEmail: true,
    },
  },
  usu_password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [6, 255],
    },
  },
  usu_nome: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  usu_ra: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      len: [5, 15],
    },
  },
  usu_celular: {
    type: Sequelize.STRING,
  },
  usu_gruid: {
    type: Sequelize.INTEGER,

    references: {
      model: Grupo,
      key: 'gru_id',
    },
  },
  usu_acesso: {
    type: Sequelize.INTEGER,
  },
}, { hooks, tableName });

User.getDoacoes = (usu_id, camp_id) => {
  let sql = `
    SELECT
      d.doa_id,
      d.doa_quantidade,
      d.doa_confirmado,
      d."createdAt" as "doa_createdAt"
      
      FROM doacao d
      
      WHERE 1=1
        AND d.doa_campid = ${camp_id}
          AND d.doa_usuid = ${usu_id}
        
      ORDER BY
        d.doa_confirmado,
        d."createdAt"`;

  return sequelize.query(sql);
};

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.usu_password;

  return values;
};

module.exports = User;
