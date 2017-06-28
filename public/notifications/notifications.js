

(function() {
  'use strict';

  angular.module('lados').controller("NotificationsController", NotificationsController);

  NotificationsController.$inject = ['Restangular', '$state'];

  function NotificationsController(Restangular, $state) {
    var vm = this;
    vm.selectedDate = new Date();
  }
})();
