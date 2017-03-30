(function () {
    'use strict';

    angular.module('lados').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['Restangular', '$state'];

    function DashboardController(Restangular, $state) {
        var vm = this;
        vm.getInventoryDistribution = getInventoryDistribution;
        vm.getPurchaseList = getPurchaseList;
        vm.getChartByPurchase = getChartByPurchase;
        vm.activate = activate;
        vm.ifLoaded = false;

        // vm.series = ['Series A', 'Series B'];

        function activate() {
            vm.getPurchaseList();
            vm.getInventoryDistribution();
        }

        function getPurchaseList() {
            Restangular.all('api/purchase').getList().then(function (res) {
                vm.purchase = res.data;
            });
        }

        function getChartByPurchase(){
            console.log(vm.purchaseId);
            vm.getInventoryDistribution();
        }


        function getInventoryDistribution() {
            if (vm.purchaseId == 'All') {
                vm.labels = [];
                vm.data = [];
                Restangular.all('api/branch').getList().then(function (res) {
                    res.data.forEach(function (element) {
                        vm.labels.push(element.branchName);
                        Restangular.all('api/getByBranchId/' + element.id).getList().then(function (res) {
                            vm.data.push(res.data.length);
                        });
                        // vm.data.push(0);
                    }, this);
                });
            }
            else {
                vm.labels = [];
                vm.data = [];
                Restangular.all('api/branch').getList().then(function (res) {
                    res.data.forEach(function (element) {
                        vm.labels.push(element.branchName);
                        Restangular.all('api/getByBranchIdByInventory/' + element.id + '/' + vm.purchaseId).getList().then(function (res) {
                            vm.data.push(res.data.length);
                        });
                        // vm.data.push(0);
                    }, this);
                });
            }

        }


    }

})();