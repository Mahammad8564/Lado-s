"use strict";
module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        inventoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username must be unique.'
            }
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false

        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL
        }
    }, {
            classMethods: {
                associate: function (models) {

                    Inventory.hasMany(models.Product);

                }
            }
        }


    );

    return Inventory;
};