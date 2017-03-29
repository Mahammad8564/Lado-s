var category = require('../../app/controllers/category');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/category')
        .get(queryBuilder.queryBuilder, category.list)
        .post(category.create);

    app.route('/api/category/:categoryId')
        .get(category.read)
        .patch(category.update)
        //.delete(measurement.delete);

    app.param('categoryId', category.getById);
}