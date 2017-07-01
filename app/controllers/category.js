var models = require('../models');
var Category = models.Category;
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
//For Geting list of Categorys
exports.list = function (req, res) {
    Category.findAndCountAll(req.options).then(function (arrs) {
        res.setHeader('total', arrs.count);
        res.json(arrs.rows);
    }).catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.read = function (req, res) {
    res.json(req.category);
}

exports.getById = function (req,res,next) {
    Category.findOne({
        where: { id: req.params.categoryId},
        //include: []
    }).then(function (obj) {
        req.category = obj;
        next();
    }).catch(function (err) {
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.create = function (req, res) {
    Category.create(req.body).then(function (obj) {
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
    var category = req.category;
    _.forEach(req.body, function (val, key) {
        category.dataValues[key] = val;
    });
    Category.update(category.dataValues, {
            where: {
                id: req.params.categoryId
            }
        })
     .then(function (obj) {
         return res.json(obj);
    }).catch(function (error) {
        return res.status(400).send({ message: getErrorMessage(error) });
    });

}