const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // instance method utilizing .compareSync() method provided by bcrypt library
  validatePassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password)
  }
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    // use hook to encrypt password BEFORE creating newUser
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;