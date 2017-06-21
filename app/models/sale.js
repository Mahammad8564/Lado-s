"use strict";
module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      MobileNumber: {
        allowNull: false,
        type: DataTypes.STRING
      },
      InvoiceId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: function(models) {
          Sale.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });

          Sale.belongsTo(models.Product, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    }


  );

  return Sale;
};
