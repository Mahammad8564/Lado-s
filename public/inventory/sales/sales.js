(function() {
  'use strict';
  angular.module('lados').controller('SalesController', SalesController);

  SalesController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

  function SalesController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
    var vm = this;
    vm.getList = getList;
    vm.branchlist = getAllBranch;
    vm.purchase = getAllPurchase;

    function getList() {
      Restangular.all('api/sale').getList().then(function(res) {
        vm.list = res.data;
        // vm.options.totalItems = parseInt(res.headers('total'));
      });
    }



    function getAllPurchase() {
      Restangular.all('api/purchase').getList().then(function(res) {
        vm.Purchaselist = res.data;
      });
    }

    function getAllBranch() {
      Restangular.all('api/branch').getList().then(function(res) {
        vm.Branchlist = res.data;
      });
    }

    function activet() {
      getAllPurchase();
      getAllBranch();
    }
    activet();
  }

})();
