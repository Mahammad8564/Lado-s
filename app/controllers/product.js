
var models = require('../models');
var Product = models.Product;
var Category = models.Category;
var Purchase = models.Purchase;
var Branch = models.Branch;
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

//getting List of
//For Geting list of Products
exports.list = function(req, res) {
  Product.findAndCountAll({

    include: [Purchase, Category, Branch]
  }).then(function(arrs) {
    res.setHeader('total', arrs.count);
    res.json(arrs.rows);
  }).catch(function(err) {
    console.log(err);
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.unallocateProduct = function(req, res) {
  Product.findAndCountAll({
    where: {
      branchId: null
    },
    include: [Category, Purchase]
    // include: [{ model: Category }, { model: Purchase }]
  }).then(function(arrs) {
    res.setHeader('total', arrs.count);
    res.json(arrs.rows);
  }).catch(function(err) {
    console.log(err);
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getUnsoldList = function(req, res) {
  Product.findAndCountAll({
    where: {
      BranchId: req.params.BranchId,
      status: 'new'
    },
    include: [Category, Purchase]
    // include: [{ model: Category }, { model: Purchase }]
  }).then(function(arrs) {
    res.setHeader('total', arrs.count);
    res.json(arrs.rows);
  }).catch(function(err) {
    console.log(err);
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getSoldCount = function(req, res) {
  if (req.params.BranchId == 'all') {
    Product.findAndCountAll({
      where: {
        status: 'sold'
      }
    }).then(function(arrs) {
      res.setHeader('total', arrs.count);
      res.json(arrs.count);
    }).catch(function(err) {
      console.log(err);
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  } else {
    Product.findAndCountAll({
      where: {
        BranchId: req.params.BranchId,
        status: 'sold'
      }
    }).then(function(arrs) {
      res.setHeader('total', arrs.count);
      res.json(arrs.count);
    }).catch(function(err) {
      console.log(err);
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  }

}

exports.getUnSoldCount = function(req, res) {
  if (req.params.BranchId == 'all') {
    Product.findAndCountAll({
      where: {
        status: 'new'
      }
    }).then(function(arrs) {
      res.setHeader('total', arrs.count);
      res.json(arrs.count);
    }).catch(function(err) {
      console.log(err);
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  } else {
    Product.findAndCountAll({
      where: {
        BranchId: req.params.BranchId,
        status: 'new'
      }
    }).then(function(arrs) {
      res.setHeader('total', arrs.count);
      res.json(arrs.count);
    }).catch(function(err) {
      console.log(err);
      res.status(400).send({
        message: getErrorMessage(err)
      });
    });
  }

}

exports.read = function(req, res) {
  res.json(req.product);
}

exports.getById = function(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.productId
    },
    //include: []
  }).then(function(obj) {
    res.json(obj);

    req.product = obj;
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getByPurchaseId = function(req, res, next) {
  Product.findAll({
    where: {
      PurchaseId: req.params.purchaseId
    },
    include: [Category, Branch, Purchase]
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getByBranchId = function(req, res, next) {
  Product.findAll({
    where: {
      BranchId: req.params.BranchId
    },
    include: [Purchase, Branch]
  }).then(function(obj) {
    res.json(obj);
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getByBranchIdAndSold = function(req, res, next) {
  Product.findAll({
    where: {
      BranchId: req.params.BranchId,
      status: 'sold'
    },
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.groupByBranchId = function(req, res, next) {

  Product.findAll({
    attributes: ['BranchId',
      Sequelize.fn('count', Sequelize.col('status'))
    ],
    group: ["Product.BranchId"]
  }).then(function(obj) {
    res.json(obj);
  });

  Product
}

exports.getByBranchIdByInventory = function(req, res, next) {
  Product.findAll({
    where: {
      BranchId: req.params.BranchId,
      PurchaseId: req.params.PurchaseId
    },
  }).then(function(obj) {
    res.json(obj);
    // next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.getByBranchIdByInventoryAndSold = function(req, res, next) {
  Product.findAll({
    where: {
      BranchId: req.params.BranchId,
      PurchaseId: req.params.PurchaseId,
      status: 'sold'
    },
  }).then(function(obj) {
    res.json(obj);
    // next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}

exports.create = function(req, res) {
  Product.create(req.body).then(function(obj) {
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
}

exports.update = function(req, res) {
  var product = req.product;
  _.forEach(req.body, function(val, key) {
    product.dataValues[key] = val;
  });
  Product.update(product.dataValues, {
      where: {
        id: req.params.productId
      }
    })
    .then(function(obj) {
      return res.json(obj);
    }).catch(function(error) {
      return res.status(400).send({
        message: getErrorMessage(error)
      });
    });

}

// saurabh

exports.getTotalCostByBranchId = function(req, res, next) {
  Product.sum('unitCost', {
    where: {
      BranchId: req.params.BranchId,
    },
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}



exports.getTotalPriceByBranchId = function(req, res, next) {
  Product.sum('unitPrice', {
    where: {
      BranchId: req.params.BranchId,
      status: 'new'
    },
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}



exports.getTotalItemByBranchId = function(req, res, next) {
  Product.count({
    where: {
      BranchId: req.params.BranchId,
    },
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}


exports.getTotalPriceByPurchaseId = function(req, res, next) {
  Product.sum('unitPrice', {
    where: {
      PurchaseId: req.params.purchaseId
    },
  }).then(function(obj) {
    res.json(obj);
    next();
  }).catch(function(err) {
    res.status(400).send({
      message: getErrorMessage(err)
    });
  });
}
