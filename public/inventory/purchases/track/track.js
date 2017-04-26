(function () {
    'use strict';

    angular.module('lados').controller('TrackController', TrackController);

    TrackController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function TrackController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        vm.activate = activate;

        function activate() {
            getPurchase();
            getList();
            getBranch();
            getSale();
        }

        function getPurchase() {
            Restangular.one('api/purchase/' + $stateParams.purchaseId).get().then(function (res) {
                vm.purchase = res.data;
            });
        }

        function getList() {
            Restangular.all('api/productByPurchase/' + $stateParams.purchaseId).getList().then(function (res) {
                vm.list = res.data;
                vm.list = _.filter(vm.list, function(obj){ return obj.BranchId != null });
                vm.groupByBranch = _.groupBy(vm.list, function (obj) { return obj.Branch.branchName; });
                vm.groupByStatus = _.groupBy(vm.list, function (obj) { return obj.status; });
                // delete vm.groupByBranch.null;
                console.log(vm.list);
                console.log(vm.groupByBranch);
                console.log(vm.groupByStatus);
            });
        }

        function getBranch() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.branch = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

        function getSale() {
            Restangular.all('api/sale').getList().then(function (res) {
                vm.sale = res.data;
                vm.groupByPurchase = _.groupBy(vm.sale, function (obj) { return obj.Product.PurchaseId; });
                console.log(vm.sale);
                console.log(vm.groupByPurchase);
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

    }

})();