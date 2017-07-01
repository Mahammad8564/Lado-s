 (function() {
   'use strict';
   angular.module('lados').controller("ReportsController", ReportsController);
   ReportsController.$inject = ['Authentication', 'Restangular', '$state', '$scope'];

   function ReportsController(Authentication, Restangular, $state, $scope) {
     var vm = this;
     vm.openCal1 = openCal1;
     vm.openCal2 = openCal2;
     vm.activet = activet;
     vm.getAllList = getAllList;
     vm.filter = filter;
     vm.user = Authentication.user;
     vm.list = [];
     vm.exportToPdf = exportToPdf;
     vm.enddate = new Date();
     vm.startdate = new Date();

     function openCal1() {
       vm.open_datefrom = !vm.open_datefrom;
     }

     function openCal2() {
       vm.open_dateto = !vm.open_dateto;
     }

     function activet() {
       vm.getAllList();
     }

     function exportToPdf() {
       html2canvas(document.getElementById('myReport'), {
         onrendered: function(canvas) {
           var data = canvas.toDataURL();
           var docDefinition = {
             content: [{
                 text: 'Lados Designer Studio.',
                 fontSize: 10,
                 bold: false,
                 alignment: 'center',
                 margin: [0, 5, 0, 5]
               },
               {
                 image: data,
                 width: 530
               }
             ]
           };
           pdfMake.createPdf(docDefinition).download("report.pdf");
         }
       });
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

     function filter() {
       switch (vm.product.option) {
         case 'frequency':
           switch (vm.product.frequency) {
             case 'today':
               vm.product.frequency = new Date().setHours(0, 0, 0, 0);
               break;
             case 'week':
               var date = new Date();
               date.setDate(date.getDate() - 6);
               date.setHours(0, 0, 0, 0);
               vm.product.frequency = date.getTime();
               break;
             case 'month':
               var date = new Date();
               date.setDate(date.getDate() - 29);
               date.setHours(0, 0, 0, 0);
               vm.product.frequency = date.getTime();
               break;
           }
           break;
         case 'custom':
           vm.product.frequency = null;
           vm.product.fromDate = vm.product.startDate.getTime();
           vm.product.endDate.setHours(23, 59, 59, 999)
           vm.product.toDate = vm.product.endDate.getTime();
           break;
       }
       Restangular.all('api/sale/report').post(vm.product).then(function(res) {
         vm.list = res.data;
         vm.totalProfit = 0;
         _.forEach(vm.list, function(List, key) {
           vm.totalProfit += (List.price - List.Product.unitCost);
         });
       });
     }
   }
 })();
