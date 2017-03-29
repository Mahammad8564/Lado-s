(function () {
    'use strict';

    angular.module('lados').controller('TrackController', TrackController);

    TrackController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function TrackController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        vm.getList = getList;

        Restangular.one('api/purchase/' + $stateParams.purchaseId).get().then(function (res) {
            vm.purchaseName = res.data.purchaseName;
        });

        function getList() {
            Restangular.all('api/productByPurchase/' + $stateParams.purchaseId).getList().then(function (res) {
                vm.list = res.data;
            });
        }

    }

})();