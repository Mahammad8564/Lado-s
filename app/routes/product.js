var product = require('../../app/controllers/product');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/product')
        .get(queryBuilder.queryBuilder, product.list)
        .post(product.create);

    app.route('/api/product/:productId')
        .get(product.read)
        .patch(product.update);
    //.delete(measurement.delete);

    app.route('/api/productByPurchase/:purchaseId')
        .get(product.getByPurchaseId);

    app.route('/api/unallocateProduct')
        .get(product.list2);

    app.route('/api/unsold/:BranchId')
        .get(product.getUnsoldList);

    app.route('/api/getByBranchId/:BranchId')
        .get(product.getByBranchId);

    app.route('/api/getByBranchIdByInventory/:BranchId/:PurchaseId')
        .get(product.getByBranchIdByInventory);

    app.param('productId', product.getById);
    // app.param('purchaseId', product.getByPurchaseId);
}