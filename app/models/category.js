"use strict";
module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Category name must be unique.'
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

                Category.hasMany(models.Product);

            }
        }
    } 

    );

    return Category;
};