var models = require('../models');
var Sale = models.Sale;
var Branch = models.Branch;
var Category = models.Category;
var Purchase = models.Purchase;
var Product = models.Product;
var User = models.User;
var Sequelize = require('sequelize');
var _ = require('underscore');
//get Error Message Consized
var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errorName in err.errors) {
            if (err.errors[errorName].message) {
                return err.errors[errorName].message;
            }
        }
    } else {
        return 'Unknown Server Error';
    }
}

//getting List of 
//For Geting list of Sales
exports.list = function (req, res) {
    req.options.include = [{model:Product,include:[Branch,Category,Purchase]},User];
    Sale.findAndCountAll(req.options).then(function (arrs) {
        res.setHeader('total', arrs.count);
        res.json(arrs.rows);
    }).catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.read = function (req, res) {
    res.json(req.sale);
}

exports.getById = function (req,res,next) {
    Sale.findOne({
        where: { id: req.params.saleId},
        //include: []
    }).then(function (obj) {
        req.sale = obj;
        next();
    }).catch(function (err) {
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.create = function (req, res) {
    Sale.create(req.body).then(function (obj) {
        if (!obj) {
            return res.send({ message: "Error Occured while updataing" });
        }
        var objData = obj.get({
            plain: true
        });
        res.json(objData);
    }).catch(function (error) {
        res.status(400).status(500).send({ message: getErrorMessage(error) });
    });
}

exports.update = function (req, res) {
    var sale = req.sale;
    _.forEach(req.body, function (val, key) {
        sale.dataValues[key] = val;
    });
    Sale.update(sale.dataValues, {
            where: {
                id: req.params.saleId
            }
        })
     .then(function (obj) {
         return res.json(obj);
    }).catch(function (error) {
        return res.status(400).send({ message: getErrorMessage(error) });
    });

}