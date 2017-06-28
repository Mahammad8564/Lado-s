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
         vm.branch = res.data;
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
         vm.purchase = res.data;
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
         console.log(res.data);
         vm.BranchDropdownList = res.data;
       });

     }


     //===============================================Tab 2===============================================
     //  vm.getChartData1 = getChartData1;
     //  vm.getChartData2 = getChartData2;
     //  vm.getChartData3 = getChartData3;

     //  vm.getList = getList;
     //
     //  vm.getChartByDropdown1 = getChartByDropdown1;
     //  vm.getChartByDropdown2 = getChartByDropdown2;
     //  vm.getChartByDropdown3 = getChartByDropdown3;
     //  vm.profit = [];
     //
     //
     //  vm.dropdown1 = 'All';
     //  vm.dropdown2 = 'All';
     //  vm.dropdown3 = 'All';
     //  vm.dropdown4 = 'All';
     //


     function activate() {
       vm.getBranchDropdownList();
       vm.getPurchase();
       vm.getBranchs();

       //
       //  vm.getList(function() {
       //    vm.getChartData2();
       //    vm.getChartData1();
       //    vm.getChartData3();
       //  });
     }




     //  function getTotalPriceByPurchse(id) {
     //    Restangular.one('api/getTotalPrice/' + id).get().then(function(res) {
     //      vm.profit = res.data;
     //    });
     //  }

     //  function getChartByDropdown1() {
     //    vm.getChartData1();
     //  }
     //
     //  function getChartByDropdown2() {
     //    vm.getChartData2();
     //  }
     //
     //  function getChartByDropdown3() {
     //    vm.getChartData3();
     //  }


     // Inventory Distribution========================================chart

     function inventoryDistributionChart() {

       if (vm.inventoryDistribution == 'All') {
         vm.labels1 = [];
         vm.data1 = [];
         vm.BranchDropdownList.forEach(function(element) {
           vm.labels1.push(element.branchName);

           Restangular.all('api/product/getByBranchId/' + element.id).getList().then(function(res) {
             vm.data1.push(res.data.length);
           });
         }, this);
       } else {
         vm.labels1 = [];
         vm.data1 = [];
         vm.branch.forEach(function(element) {
           vm.labels1.push(element.branchName);
           console.log('api/getByBranchIdByInventory/' + element.id + '/' + vm.inventoryDistribution);
           Restangular.all('api/getByBranchIdByInventory/' + element.id + '/' + vm.inventoryDistribution).getList().then(function(res) {
             vm.data1.push(res.data.length);
           });
         }, this);
       }
     }





     // Inventory Track & Sales ================================ chart

     function getChartData2() {

       vm.noDataFound = false;
       vm.labels2 = ['In Stock', 'Sold'];

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

 })();
