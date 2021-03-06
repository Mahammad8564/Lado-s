var sale = require('../../app/controllers/sale');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function(app) {

  app.route('/api/sale')
    .get(queryBuilder.queryBuilder, sale.list)
    .post(sale.create);

  app.route('/api/sale/:saleId')
    .get(sale.read)
    .patch(sale.update)

  app.route('/api/sale/product/:UserId')
    .get(sale.getByUserId);

  app.route('/api/sale/sold/:branchId')
    .get(sale.getByUserId);


  app.route('/api/sale/getByProductCode/:productCode')
    .get(sale.getByProductCode);


  app.route('/api/sale/report')
    .post(sale.getReport);

  app.route('/api/sale/userReport')
    .post(sale.getUserReport);




  app.route('/api/sale/invoice/:InvoiceId')
    .get(sale.getByInvoiceId);


  app.param('saleId', sale.getById);
}
