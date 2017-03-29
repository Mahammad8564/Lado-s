"use strict";
module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("Sale", {

        price: {
            allowNull: false,
            type: DataTypes.DECIMAL
        }
    }


    );

    return Sale;
};