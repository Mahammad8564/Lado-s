"use strict";
module.exports = function (sequelize, DataTypes) {
    var Branch = sequelize.define("Branch", {
        branchName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Branchname must be unique.'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
            classMethods: {
                associate: function (models) {

                    Branch.hasMany(models.User);

                    Branch.hasMany(models.Product);
                    

                }
            }
        }


    );

    return Branch;
};