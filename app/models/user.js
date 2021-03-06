﻿
"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username must be unique.'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false

      },
      pwd: {
        type: DataTypes.STRING,
        allowNull: false

      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userrole: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          User.belongsTo(models.Branch, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          });

          User.hasMany(models.Sale);
        }
      }
    }


  );

  return User;
};
