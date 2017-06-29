

(function() {
  'use strict';

  angular.module('lados').controller("NotificationsController", NotificationsController);

  NotificationsController.$inject = ['Restangular', '$state'];

  function NotificationsController(Restangular, $state) {
    var vm = this;
    vm.selectedDate = new Date();
    vm.notification = notification;
    vm.formatDate = formatDate;

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    function notification(date) {

      var updateDate = vm.formatDate(date)
      console.log(updateDate);

      Restangular.one('api/product').get().then(function(res) {
        vm.product = res.data;
        vm.data = [];
        _.forEach(vm.product, function(List, key) {
          var databaseDate = formatDate(List.updatedAt);
          if (databaseDate === updateDate) {
            vm.data.push(List)
          }

        });
      });
    }

    vm.notification(vm.selectedDate)
  }
})();
