(function () {
    'use strict';

    angular.module('lados').controller('ManageInventoryController', ManageInventoryController);

    ManageInventoryController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams','toastr'];

    function ManageInventoryController(Authentication, Restangular, $state, SweetAlert, $stateParams,toastr) {
        var vm = this;
        vm.selected = {};
        vm.user = Authentication.user;
        vm.getList = getList;
        vm.allocate = allocate;
        vm.getBranchList = getBranchList;

        toastr.success('Hello world!', 'Toastr fun!');

        function getBranchList() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.branch = res.data;
            });
        }

        function allocate() {
            for (var name in vm.selected) {
                if (vm.selected[name]) {
                    Restangular.one('api/product/' + name).patch({BranchId:vm.branchId}).then(function (res) {
                        vm.getList();
                    }, function (err) {
                        vm.error = err.data.message;
                        vm.startProcessing = false;
                    });
                }
            }
            vm.selected = {};
        }

        function getList() {
            Restangular.all('api/unallocateProduct').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

    }

})();