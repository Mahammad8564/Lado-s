(function () {
    'use strict';

    angular.module('lados').controller('HomeController', HomeController);

    HomeController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function HomeController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.selected = {};
        vm.user = Authentication.user;
        vm.getList = getList;
        vm.save = save;
        vm.checkAll = checkAll;
        vm.getProductList = getProductList;

        function checkAll(bool) {
            if (bool) {
                vm.list.forEach(function (element) {
                    vm.selected[element.id] = true;
                }, this);
            }
            else {
                vm.selected = {};
            }
        }

        function getList(){
            Restangular.all('api/sale').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

        function getProductList() {
            Restangular.all('api/unsold/' + vm.user.BranchId).getList().then(function (res) {
                vm.product = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

        function save(form) {

            if (form.$invalid) {
                _.forEach(form.$error, function (err) {
                    _.forEach(err, function (frm) {
                        frm.$setDirty();
                    });
                });
                vm.isSubmitted = true;
                return;
            }

            if (!vm.product.id) {
                vm.sale.ProductId = parseInt(vm.sale.ProductId);
                vm.sale.UserId = vm.user.id;
                console.log(vm.sale)
                Restangular.all('api/sale').post(vm.sale).then(function (res) {
                    Restangular.one('api/product/' + vm.sale.ProductId).patch({status:'sold'}).then(function (res) {
                        console.log(res);
                        swal('good job', "product is updated successfully", "success");
                        vm.getProductList();
                        // $state.go('secure.product');
                    }, function (err) {
                        vm.error = err.data.message;
                        vm.startProcessing = false;
                    });
                }, function (err) {
                    console.log(err.data.message);
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/product/' + vm.product.id).patch(vm.product).then(function (res) {
                    swal(vm.product.productCode, "product is updated successfully", "success");
                    $state.go('secure.product', { purchaseId: $stateParams.purchaseId });
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

    }

})();