(function () {
    'use strict';

    angular.module('lados').controller('BranchController', BranchController);

    BranchController.$inject = ['Authentication','Restangular', '$state', 'SweetAlert', '$stateParams'];

    function BranchController(Authentication,Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        console.log(vm.user);
        vm.save = save;
        vm.getList = getList;

        function getList() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }


        function save() {
            Restangular.all('api/branch').post(vm.branch).then(function (res) {
                SweetAlert.swal("Material saved successfully!");
                $state.go('secure.branch');
            }, function (err) {
                vm.error = err.data.message;
                vm.startProcessing = false;
            });
        }
    }

})();