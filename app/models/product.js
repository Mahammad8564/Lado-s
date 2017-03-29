"use strict";
module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productnNme: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username must be unique.'
            }
        },
        productCode: {
            type: DataTypes.STRING,
            allowNull: false

        },

        productTag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        image: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
            classMethods: {
                associate: function (models) {

                    Product.belongsTo(models.Branch, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        },
                        as: 'branch'
                    });

                    Product.belongsTo(models.Category, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        },
                        as: 'category'
                    });
                }
            }
        }


    );

    return Product;
};