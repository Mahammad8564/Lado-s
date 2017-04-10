

(function () {
    'use strict';

    angular.module('lados').controller('secureUserController', secureUserController);

    secureUserController.$inject = ['Authentication', 'Restangular', '$state'];

    function secureUserController(Authentication, Restangular, $state) {
        var vm = this;
        vm.user = Authentication.user;
        vm.logout = logout;
        vm.toggle = toggle;
        vm.toggleActive = toggleActive;

        function toggleActive() {
            $(this).toggleClass("active");
        }




        function logout() {
            console.log('hay');
            Restangular.one('signout').get().then(function (res) {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this imaginary file!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            // swal("Deleted!", "Your imaginary file has been deleted.", "success");
                            location.reload();
                        } 
                        // else {
                        //     swal("Cancelled", "Your imaginary file is safe :)", "error");
                        // }
                    });
            }, function (err) {
                vm.error = err.data.message;
                vm.startProcessing = false;
            });

        }

        function toggle() {
            $(".navbar").slideToggle();
        }
    }

})();