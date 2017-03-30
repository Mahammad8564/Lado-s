(function () {
    'use strict';

    angular.module('lados').controller('ProductController', ProductController);

    ProductController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function ProductController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        vm.save = save;
        vm.addNext = addNext;
        vm.getList = getList;
        vm.edit = edit;
        vm.add = add;
        vm.getCategoryList = getCategoryList;

        Restangular.one('api/purchase/' + $stateParams.purchaseId).get().then(function (res) {
            vm.purchaseName = res.data.purchaseName;
        });

        if ($stateParams.id && $stateParams.id != 'new') {
            Restangular.one('api/product/' + $stateParams.id).get().then(function (res) {
                vm.product = res.data;
            });
        }

        function getCategoryList() {
            Restangular.all('api/category').getList().then(function (res) {
                vm.category = res.data;
            });
        }

        function getList() {
            Restangular.all('api/productByPurchase/' + $stateParams.purchaseId).getList().then(function (res) {
                vm.list = res.data;
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

            vm.product.PurchaseId = $stateParams.purchaseId;
            vm.product.productTag = vm.product.productCode + ' - ' + vm.product.productName;
            vm.product.categoryId = parseInt(vm.product.categoryId);

            if (!vm.product.id) {
                Restangular.all('api/product').post(vm.product).then(function (res) {
                    SweetAlert.swal("Material saved successfully!");
                    $state.go('secure.product', { purchaseId: $stateParams.purchaseId });
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/product/' + vm.product.id).patch(vm.product).then(function (res) {
                    SweetAlert.swal("Material updated successfully!");
                    $state.go('secure.product', { purchaseId: $stateParams.purchaseId });
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

        function addNext(form) {

            if (form.$invalid) {
                _.forEach(form.$error, function (err) {
                    _.forEach(err, function (frm) {
                        frm.$setDirty();
                    });
                });
                vm.isSubmitted = true;
                return;
            }

            vm.product.PurchaseId = $stateParams.purchaseId;
            vm.product.productTag = vm.product.productCode + ' - ' + vm.product.productName;
            vm.product.CategoryId = parseInt(vm.product.CategoryId);

            if (!vm.product.id) {
                Restangular.all('api/product').post(vm.product).then(function (res) {
                    vm.product = {};
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/product/' + vm.product.id).patch(vm.product).then(function (res) {
                    vm.product = {};
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

        function edit(obj) {
            $state.go('secure.edit-product', { id: obj.id, purchaseId: $stateParams.purchaseId });
        }

        function add() {
            $state.go('secure.edit-product', { id: 'new', purchaseId: $stateParams.purchaseId });
        }

    }

})();