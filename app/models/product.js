"use strict";
module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productName: {
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productTag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unitPrice: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        unitCost: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        image: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
            classMethods: {
                associate: function (models) {

                    Product.belongsTo(models.Branch, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: true
                        }
                    });

                    Product.belongsTo(models.Category, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });

                    Product.belongsTo(models.Purchase, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }


    );

    return Product;
};