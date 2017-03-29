"use strict";
module.exports = function (sequelize, DataTypes) {
    var Invoice = sequelize.define("Invoice", {
        invoiceNumber: {
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
    }


    );

    return Invoice;
};