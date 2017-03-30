

(function () {
    'use strict';

    angular.module('lados').controller('SecureController', SecureController);

    SecureController.$inject = ['Authentication','$state'];
    
    function SecureController(Authentication,$state) {
        var vm = this;
        vm.user = Authentication.user;
        vm.logout = logout;
        vm.toggle = toggle;
        vm.toggleActive = toggleActive;

        function toggleActive() {
            $(this).toggleClass("active");
        }

        function logout() {
            // window.location.href = "/signout";
            console.log('sgerh');
            delete window.user;
            $state.go('login');
            window.location.href = "#!/login";
        }

        function toggle() {
            $(".navbar").slideToggle();
        }
    }

})();