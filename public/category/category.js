(function () {
    'use strict';

    angular.module('lados').controller('CategoryController', CategoryController);

    CategoryController.$inject = ['Authentication','Restangular', '$state', 'SweetAlert', '$stateParams'];

    function CategoryController(Authentication,Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        console.log(vm.user);
        vm.save = save;
        vm.getList = getList;

        function getList() {
            Restangular.all('api/category').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }


        function save() {
            Restangular.all('api/category').post(vm.category).then(function (res) {
                SweetAlert.swal("Material saved successfully!");
                $state.go('secure.category');
            }, function (err) {
                vm.error = err.data.message;
                vm.startProcessing = false;
            });
        }
    }

})();