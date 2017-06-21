
(function() {
  'use strict';

  angular.module('lados').controller('UserDashboardController', UserDashboardController);

  UserDashboardController.$inject = ['Authentication', 'Restangular', '$state', '$q'];

  function UserDashboardController(Authentication, Restangular, $state, $q) {
    var vm = this;
    var user = Authentication.user;

    vm.labels = ["In Stock", "Sold"];

    function activate() {
      Restangular.one('api/branch/' + user.BranchId).get().then(function(res) {
        vm.branch = res.data;
      });

      Restangular.one('api/unsold/' + user.BranchId).get().then(function(res) {
        vm.InStock = res.data;
      });

      Restangular.one('api/sold/' + user.BranchId).get().then(function(res) {
        vm.Sold = res.data;
      });

      Restangular.one('api/getTotalCostByBranchId/' + user.BranchId).get().then(function(res) {
        vm.TotalCost = res.data;
      });
      Restangular.one('api/getTotalPriceByBranchId/' + user.BranchId).get().then(function(res) {
        vm.TotalPrice = res.data;
      });

      Restangular.one('api/getTotalItemByBranchId/' + user.BranchId).get().then(function(res) {
        vm.TotalItem = res.data;
      });
    }

    activate();


  }
})();
