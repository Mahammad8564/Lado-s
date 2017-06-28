var product = require('../../app/controllers/product');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function(app) {
  app.route('/api/product')
    .get(queryBuilder.queryBuilder, product.list)
    .post(product.create);

  app.route('/api/product/:productId')
    .get(product.read)
    .patch(product.update);
  //.delete(measurement.delete);

  app.route('/api/productByPurchase/:purchaseId')
    .get(function(req, res, next) {
      next();
    }, product.getByPurchaseId);

  app.route('/api/unallocateProduct')
    .get(product.unallocateProduct);

  app.route('/api/product/unsoldList/:BranchId')
    .get(product.getUnsoldList);

  app.route('/api/unsold/:BranchId')
    .get(product.getUnSoldCount);

  app.route('/api/sold/:BranchId')
    .get(product.getSoldCount);

  app.route('/api/groupByBranchId/:BranchId')
    .get(product.groupByBranchId);

  app.route('/api/product/getByBranchId/:BranchId')
    .get(product.getByBranchId);

  app.route('/api/getByBranchIdAndSold/:BranchId')
    .get(product.getByBranchIdAndSold);

  app.route('/api/getByBranchIdByInventory/:BranchId/:PurchaseId')
    .get(product.getByBranchIdByInventory);

  app.route('/api/getByBranchIdByInventoryAndSold/:BranchId/:PurchaseId')
    .get(product.getByBranchIdByInventoryAndSold);

  // saurabh
  app.route('/api/getTotalCostByBranchId/:BranchId')
    .get(product.getTotalCostByBranchId);

  app.route('/api/getTotalPriceByBranchId/:BranchId')
    .get(product.getTotalPriceByBranchId);

  app.route('/api/getByBranchId/:BranchId')
    .get(product.getByBranchId);

  app.route('/api/getTotalItemByBranchId/:BranchId')
    .get(product.getTotalItemByBranchId);
  //
  // app.route('/api/getProfitByBranchId/:BranchId')
  //   .get(product.getProfitByBranchId);


  app.route('/api/getTotalPrice/:purchaseId')
    .get(product.getTotalPriceByPurchaseId);





  app.param('productId', product.getById);


}
