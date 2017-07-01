var product = require('../../app/controllers/product');
var purchase = require('../../app/controllers/purchase');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function(app) {
  app.route('/api/purchase')
    .get(queryBuilder.queryBuilder, purchase.list)
    .post(purchase.create);

  app.route('/api/purchase/:purchaseId')
    .patch(purchase.update)
    .get(purchase.getById);

  app.route('/api/purchase/getTotalPrice/:purchaseId')
    .get(product.getTotalPriceByPurchaseId);

  // app.param('purchaseId', purchase.getById);
}
