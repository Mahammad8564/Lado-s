

(function () {
    'use strict';

    angular.module('lados').controller("ReportsController", ReportsController);

    ReportsController.$inject = ['Restangular', '$state'];

    function ReportsController(Restangular, $state) {
        var vm = this;
        vm.openCal1 = openCal1;
        vm.openCal2 = openCal2;
        vm.change = change;

        vm.getDropdownList = getDropdownList;
        vm.getChartByDropdown1 = getChartByDropdown1;
        vm.getChartByDropdown2 = getChartByDropdown2;
        vm.getChartByDropdown3 = getChartByDropdown3;

        function openCal1() {
            vm.open_datefrom = !vm.open_datefrom;
        }

        function openCal2() {
            vm.open_dateto = !vm.open_dateto;
        }

        function change(){
            
        }

        function getDropdownList() {
            vm.getChartByDropdown1();
            vm.getChartByDropdown2();
            vm.getChartByDropdown3();
        }

        function getChartByDropdown1() {
            Restangular.all('api/purchase').getList().then(function (res) {
                vm.purchase = res.data;
            });
        }

        function getChartByDropdown2() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.branch = res.data;
            });

        }

        function getChartByDropdown3() {
            Restangular.all('api/category').getList().then(function (res) {
                vm.category = res.data;
            });
        }
    }

})();
