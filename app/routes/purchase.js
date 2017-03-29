var purchase = require('../../app/controllers/purchase');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/purchase')
        .get(queryBuilder.queryBuilder, purchase.list)
        .post(purchase.create);

    app.route('/api/purchase/:purchaseId')
        .get(purchase.read)
        .patch(purchase.update)
        //.delete(measurement.delete);

    app.param('purchaseId', purchase.getById);
}