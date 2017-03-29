var branch = require('../../app/controllers/branch');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/branch')
        .get(queryBuilder.queryBuilder, branch.list)
        .post(branch.create);

    app.route('/api/branch/:branchId')
        .get(branch.read)
        .patch(branch.update)
        //.delete(measurement.delete);

    app.param('branchId', branch.getById);
}