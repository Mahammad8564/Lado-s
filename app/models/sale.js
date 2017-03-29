"use strict";
module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("Sale", {

        price: {
            allowNull: false,
            type: DataTypes.DECIMAL
        }
    }, {
            classMethods: {
                associate: function (models) {
                    Sale.belongsTo(models.Product, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        },
                        as: 'product'
                    });

                }
            }
        }


    );

    return Sale;
};