(function () {
    'use strict';

    angular.module('lados').controller('ManageInventoryController', ManageInventoryController);

    ManageInventoryController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function ManageInventoryController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.selected = {};
        vm.user = Authentication.user;
        vm.getList = getList;
        vm.allocate = allocate;
        vm.getBranchList = getBranchList;
        vm.checkAll = checkAll;

        function checkAll(bool){
            if(bool){
                vm.list.forEach(function(element) {
                    vm.selected[element.id] = true;
                }, this);
            }
            else{
                vm.selected = {};
            }
        }

        function getBranchList() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.branch = res.data;
            });
        }

        function allocate(form) {
            if (form.$invalid) {
                _.forEach(form.$error, function (err) {
                    _.forEach(err, function (frm) {
                        frm.$setDirty();
                    });
                });
                vm.isSubmitted = true;
                return;
            }

            for (var name in vm.selected) {
                if (vm.selected[name]) {
                    Restangular.one('api/product/' + name).patch({ BranchId: vm.branchId }).then(function (res) {
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