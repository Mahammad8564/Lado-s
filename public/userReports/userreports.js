 (function() {
   'use strict';

   angular.module('lados').controller("userReportsController", userReportsController);

   userReportsController.$inject = ['Restangular', '$state'];

   function userReportsController(Restangular, $state) {
     var vm = this;
     vm.getList = getList;
     vm.activate = activate;

     vm.branch = [];
     vm.purchase = [];

     function activate() {
       vm.getList();
     }

     function getList() {
       Restangular.all('api/purchase').getList().then(function(res) {
         vm.purchase = res.data;
       });
       Restangular.all('api/category').getList().then(function(res) {
         vm.category = res.data;
       });
     }
   }
 })();
