 (function() {
   'use strict';

   angular.module('lados').controller('DashboardController', DashboardController);

   DashboardController.$inject = ['Restangular', '$state', '$q'];

   function DashboardController(Restangular, $state, $q) {
     var vm = this;
     vm.filterBranch = filterBranch;
     vm.getPurchase = getPurchase;
     vm.filterPurchase = filterPurchase;
     vm.getBranchs = getBranchs;
     vm.activate = activate;
     vm.getBranchDropdownList = getBranchDropdownList;
     vm.branchName = [];
     vm.InStock = [];
     vm.Sold = [];
     vm.tab1BranchDropdownId = 'All';
     vm.branch = [];

     // all branch data
     function getBranchs() {
       Restangular.all('api/branch').getList().then(function(res) {
         vm.branchList = res.data;
         vm.branchStock = [];
         _.forEach(res.data, function(value, key) {
           vm.branchStock[key] = _.groupBy(res.data[key].Products, function(obj) {
             return obj.status;
           });
         });
       });
     }


     // filter Branch

     function filterBranch(id) {
       if (id != 'all') {
         Restangular.one('api/product/getByBranchId/' + id).get().then(function(res) {
           vm.getFilter = res.data;
           vm.groupByStatus = _.groupBy(res.data, function(obj) {
             return obj.status;
           });
         });
       } else {
         vm.getBranchs();
       }
     }



     // all purchase data
     function getPurchase() {
       Restangular.all('api/purchase').getList().then(function(res) {
         vm.purchaseList = res.data;
         vm.stock = [];
         vm.total = [];
         vm.cost = [];
         _.forEach(res.data, function(value, key) {
           vm.stock[key] = _.groupBy(res.data[key].Products, function(obj) {
             return obj.status;
           });
           vm.total[key] = _.sumBy(res.data[key].Products, function(o) {
             return o.unitPrice;
           });
           vm.cost[key] = _.sumBy(res.data[key].Products, function(o) {
             return o.unitCost;
           });
         });
       });
     }
     // filter purchase data
     function filterPurchase(id) {
       if (id != 'all') {
         Restangular.one('api/purchase/' + id).get().then(function(res) {
           vm.getFilterPurchase = res.data;
           vm.total1 = _.sumBy(res.data.Products, function(o) {
             return o.unitPrice;
           });
           vm.groupByStatus1 = _.groupBy(res.data.Products, function(obj) {
             return obj.status;
           });
           vm.cost1 = _.sumBy(res.data.Products, function(o) {
             return o.unitCost;
           });
         });
       } else {
         vm.getPurchase();
       }
     }


     function getBranchDropdownList() {
       Restangular.all('api/branch').getList().then(function(res) {
         vm.BranchDropdownList = res.data;
       });

     }


     //===============================================Tab 2===============================================

     vm.getStats = getStats;


     function getStats() {
       vm.branch.forEach(function(element) {
         Restangular.one('api/unsold/' + element.id).get().then(function(res) {
           vm.InStock.push(res.data);
         });
         Restangular.one('api/sold/' + element.id).get().then(function(res) {
           vm.Sold.push(res.data);
         });
       }, this);

       vm.TotalInStock = vm.InStock.reduce(function(acc, val) {
         return acc + val;
       }, 0);

       vm.TotalSold = vm.Sold.reduce(function(acc, val) {
         return acc + val;
       }, 0);
     }





     //===============================================Tab 2===============================================
     vm.getChartData1 = getChartData1;
     vm.getChartData2 = getChartData2;
     vm.getChartData3 = getChartData3;

     vm.getList = getList;

     vm.getChartByDropdown1 = getChartByDropdown1;
     vm.getChartByDropdown2 = getChartByDropdown2;
     vm.getChartByDropdown3 = getChartByDropdown3;

     vm.activate = activate;

     Restangular.all('api/branch').getList().then(function(res) {
       vm.branch = res.data;
       vm.branchCopy = res.data;
     });

     function activate() {

       vm.getBranchDropdownList()
       vm.getPurchase();
       vm.getBranchs();
       vm.getList(function() {
         vm.getStats();
         vm.getChartData1();
         vm.getChartData2();
         vm.getChartData3();
       });
     }

     function getList(cb) {
       Restangular.all('api/purchase').getList().then(function(res) {
         vm.purchase = res.data;
         Restangular.all('api/branch').getList().then(function(res) {
           vm.branch = res.data;
           cb();
         });

       });
     }

     function getChartByDropdown1() {
       vm.getChartData1();
     }

     function getChartByDropdown2() {
       vm.getChartData2();
     }

     function getChartByDropdown3() {
       vm.getChartData3();
     }


     function getChartData1() {

       if (vm.inventoryDistribution == 'All') {
         vm.labels1 = [];
         vm.data1 = [];
         vm.branch.forEach(function(element) {
           vm.labels1.push(element.branchName);
           Restangular.all('api/getByBranchId/' + element.id).getList().then(function(res) {
             vm.data1.push(res.data.length);
           });
         }, this);
       } else {
         vm.labels1 = [];
         vm.data1 = [];
         vm.branch.forEach(function(element) {
           vm.labels1.push(element.branchName);
           Restangular.all('api/getByBranchIdByInventory/' + element.id + '/' + vm.inventoryDistribution).getList().then(function(res) {
             vm.data1.push(res.data.length);
           });
         }, this);
       }

     }

     function getChartData2() {

       vm.noDataFound = false;
       vm.labels2 = ['In Stock', 'Sold'];
       vm.chartOptions2 = {
         scales: {
           yAxes: [{
             ticks: {
               min: 0
             }
           }]
         }
       };

       if (vm.dropdown2 == 'All') {
         vm.data2 = [];
         Restangular.one('api/unsold/all').get().then(function(res) {
           vm.data2.push(res.data);

           if (res.data == 0) {
             vm.noDataFound = true;
           }
         });
         Restangular.one('api/sold/all').get().then(function(res) {
           vm.data2.push(res.data);

           if (res.data == 0) {
             vm.noDataFound = true;
           }
         });
       } else {
         vm.data2 = [];
         Restangular.one('api/unsold/' + vm.dropdown2).get().then(function(res) {
           vm.data2.push(res.data);

           if (res.data == 0) {
             vm.noDataFound = true;
           }
         });
         Restangular.one('api/sold/' + vm.dropdown2).get().then(function(res) {
           vm.data2.push(res.data);
           if (res.data == 0) {
             vm.noDataFound = true;
           }
         });
       }

     }

     function getChartData3() {

       if (vm.dropdown3 == 'All') {
         vm.labels3 = [];
         vm.data3 = [];
         vm.branch.forEach(function(element) {
           vm.labels3.push(element.branchName);
           Restangular.all('api/getByBranchIdAndSold/' + element.id).getList().then(function(res) {
             vm.data3.push(res.data.length);
           });
         }, this);
       } else {
         vm.labels3 = [];
         vm.data3 = [];
         vm.branch.forEach(function(element) {
           vm.labels3.push(element.branchName);
           Restangular.all('api/getByBranchIdByInventoryAndSold/' + element.id + '/' + vm.dropdown3).getList().then(function(res) {
             vm.data3.push(res.data.length);
           });
         }, this);
       }

     }

   }

 })();;
