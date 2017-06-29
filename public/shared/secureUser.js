(function() {
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
      Restangular.one('signout').get().then(function(res) {
        swal({
            title: "You Want To Logout ?",
            // text: "You will not be able to recover this imaginary file!",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: " cancel!",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
              location.reload();
            } else {}
          });
      }, function(err) {
        vm.error = err.data.message;
        vm.startProcessing = false;
      });
    }

    function toggle() {
      $(".navbar").slideToggle();
    }
  }
})();
