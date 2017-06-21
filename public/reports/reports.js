 (function() {
   'use strict';
   angular.module('lados').controller("ReportsController", ReportsController);
   ReportsController.$inject = ['Authentication', 'Restangular', '$state'];

   function ReportsController(Authentication, Restangular, $state) {
     var vm = this;
     vm.openCal1 = openCal1;
     vm.openCal2 = openCal2;
     vm.activet = activet;
     vm.getAllList = getAllList;
     vm.getSale = getSale;
     vm.filter = filter;
     vm.user = Authentication.user;
     vm.list = [];

     function openCal1() {
       vm.open_datefrom = !vm.open_datefrom;
     }

     function openCal2() {
       vm.open_dateto = !vm.open_dateto;
     }

     function activet() {
       vm.getAllList();
     }

     function getAllList() {
       Restangular.all('api/purchase').getList().then(function(res) {
         vm.purchase = res.data;
       });
       Restangular.all('api/branch').getList().then(function(res) {
         vm.branch = res.data;
       });
       Restangular.all('api/category').getList().then(function(res) {
         vm.category = res.data;
       });
     }

     function getSale() {

       vm.totalProfit = 0;
       Restangular.all('api/sale').getList().then(function(res) {
         vm.list = res.data;

         _.forEach(vm.list, function(List, key) {
           vm.totalProfit += (List.price - List.Product.unitCost);
         });
       });
     }

     function filter() {
       Restangular.all('api/sale/report').post(vm.product).then(function(res) {
         swal(vm.user.username, "please wait", "success");

         vm.list.push(res.data)

         console.log(res.data);

       }, function(err) {
         vm.error = err.data.message;
         vm.startProcessing = false;
         swal('Not Found', 'Sorry ' + vm.user.username + ' data Not Found', "warning");
       });


       //  console.log(vm.product);
       //  vm.getSale();
     }
   }
 })();
