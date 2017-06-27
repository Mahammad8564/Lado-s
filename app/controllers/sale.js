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
var getErrorMessage = function(err) {
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

//For Geting list of Sales
exports.list = function(req, res) {
  req.options.include = [{
    model: Product,
    include: [Branch, Category, Purchase]
  }, User];
  Sale.findAndCountAll(req.options).then(function(arrs) {
    res.setHeader('total', arrs.count);
    res.json(arrs.rows);
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}
exports.read = function(req, res) {
  res.json(req.sale);
}

exports.getById = function(req, res, next) {
  Sale.findOne({
    where: {
      id: req.params.saleId
    },
  }).then(function(obj) {
    req.sale = obj;
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.create = function(req, res) {

  var items = req.body.purchase;
  var customerName = req.body.customerName;
  var MobileNumber = req.body.MobileNumber;
  var UserId = req.body.UserId;
  var InvoiceId = req.body.InvoiceId;
  var Address = req.body.Address;


  _.forEach(items, function(val, key) {
    items[key].customerName = customerName;
    items[key].MobileNumber = MobileNumber;
    items[key].UserId = UserId;
    items[key].InvoiceId = InvoiceId;
    items[key].Address = Address;
    items[key] = val;
    Sale.create(val).then(function(obj) {
      if (!obj) {
        return res.send({
          message: "Error Occured while updataing"
        });
      }
      var objData = obj.get({
        plain: true
      });
      res.json(objData);

    }).catch(function(error) {
      res.status(400).status(500).send({
        message: getErrorMessage(error)
      });
    });
    Product.update({
        status: 'sold'
      }, {
        where: {
          id: val.ProductId

        }
      })
      .then(function(obj) {
        return res.json(obj);
      }).catch(function(error) {
        return res.status(400).send({
          message: getErrorMessage(error)
        });
      });
  });
}

exports.update = function(req, res) {
  var sale = req.sale;
  _.forEach(req.body, function(val, key) {
    sale.dataValues[key] = val;
  });
  Sale.update(sale.dataValues, {
      where: {
        id: req.params.saleId
      }
    })
    .then(function(obj) {
      res.json(obj);
      // next();
    }).catch(function(error) {
      return res.status(400).send({
        message: getErrorMessage(error)
      });
    });

}


exports.getById = function(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.productId
    },
    //include: []
  }).then(function(obj) {
    res.json(obj);
    // next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}



exports.getByUserId = function(req, res, next) {

  Sale.findAll({
    where: {
      UserId: req.params.UserId
    },
    include: [User, Product]
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });

}


exports.getByProductCode = function(req, res, next) {
  Product.findOne({
    where: {
      productCode: req.params.productCode,
      status: 'new'
    }
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}


exports.getReport = function(req, res, next) {
  var data = [];
  if (req.body.BranchId != 'All') data.push({
    "BranchId": req.body.BranchId
  });
  if (req.body.PurchaseId != 'All') data.push({
    "PurchaseId": req.body.PurchaseId
  });
  if (req.body.CategoryId != 'All') data.push({
    "CategoryId": req.body.CategoryId
  });
  data.push({
    "status": 'sold'
  });
  Product.findAll({
    where: data,
    attributes: ['id']
  }).then(function(obj) {

    var productIds = _.map((obj || []), function(product) {
      return product.id;
    }) || [];

    Sale.findAll({
      where: {
        ProductId: productIds,
        $or: [{
          InvoiceId: {
            $gte: req.body.frequency
          }
        }, {
          InvoiceId: {
            $gte: req.body.fromDate,
            $lte: req.body.toDate
          }
        }]
      },
      include: [Product]
    }).then(function(productData) {
      res.json(productData || [])
    }).catch(function(err) {
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}


exports.getUserReport = function(req, res, next) {
  var data = [];
  data.push({
    "BranchId": req.body.BranchId
  });
  if (req.body.PurchaseId != 'All') data.push({
    "PurchaseId": req.body.PurchaseId
  });
  if (req.body.CategoryId != 'All') data.push({
    "CategoryId": req.body.CategoryId
  });
  data.push({
    "status": 'sold'
  });

  Product.findAll({
    where: data,
    attributes: ['id']
  }).then(function(obj) {
    var productIds = _.map((obj || []), function(product) {
      return product.id;
    }) || [];

    Sale.findAll({
      where: {
        ProductId: productIds,
        UserId: req.body.UserId,
        $or: [{
          InvoiceId: {
            $gte: req.body.frequency
          }
        }, {
          InvoiceId: {
            $gte: req.body.fromDate,
            $lte: req.body.toDate
          }
        }]
      },
      include: [Product]
    }).then(function(productData) {
      res.json(productData || [])
    }).catch(function(err) {
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}
