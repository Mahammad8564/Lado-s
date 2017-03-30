var sale = require('../../app/controllers/sale');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/sale')
        .get(queryBuilder.queryBuilder, sale.list)
        .post(sale.create);

    app.route('/api/sale/:saleId')
        .get(sale.read)
        .patch(sale.update)
        //.delete(measurement.delete);

    app.param('saleId', sale.getById);
}