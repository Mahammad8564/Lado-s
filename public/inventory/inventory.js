(function () {
    'use strict';

    angular.module('lados').controller('InventoryController', InventoryController);

    InventoryController.$inject = ['Authentication'];
    
    function InventoryController(Authentication) {
        var vm = this;
        vm.user = Authentication.user;
        vm.toggle = toggle;

        function toggle() {
            $(".navbar").slideToggle();
        }
    }

})();