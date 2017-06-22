 (function() {
   'use strict';

   angular.module('lados').controller("userReportsController", userReportsController);

   userReportsController.$inject = ['Restangular', '$state', 'Authentication'];

   function userReportsController(Restangular, $state, Authentication) {
     var vm = this;
     vm.getList = getList;
     vm.activate = activate;

     vm.filter = filter;
     vm.user = Authentication.user;
     vm.list = [];
     vm.exportToPdf = exportToPdf;
     vm.enddate = new Date();
     vm.startdate = new Date();

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

     function exportToPdf() {
       console.log(document.getElementById('myReport'));
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


   }
 })();
