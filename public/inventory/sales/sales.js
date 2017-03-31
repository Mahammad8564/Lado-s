(function () {
    'use strict';

    angular.module('lados').controller('SalesController', SalesController);

    SalesController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function SalesController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.getList = getList;


        function getList(){
            Restangular.all('api/sale').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }

    }

})();