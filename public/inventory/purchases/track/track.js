(function() {
  'use strict';

  angular.module('lados').controller('TrackController', TrackController);

  TrackController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

  function TrackController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
    var vm = this;
    vm.user = Authentication.user;

    vm.activate = activate;
    vm.getList = getList;

    function activate() {
      vm.getList();
    }


    function getList() {

      Restangular.one('api/productByPurchase/' + $stateParams.purchaseId).get().then(function(res) {
        vm.purchase = res.data;
        vm.totalPrice = 0;
        vm.SoldItems = 0;
        vm.groupByStatus = _.groupBy(vm.purchase, function(obj) {
          return obj.status;
        });

        _.forEach(vm.purchase, function(purchase, key) {
          vm.totalPrice += purchase.unitPrice;
        });
      });

    }
  }

})();
