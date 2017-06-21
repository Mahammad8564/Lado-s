(function() {
  'use strict';

  angular.module('lados').controller('PurchasesController', PurchasesController);

  PurchasesController.$inject = ['Authentication', 'Restangular', '$state', '$stateParams'];

  function PurchasesController(Authentication, Restangular, $state, $stateParams) {
    var vm = this;
    vm.today = new Date();
    // vm.purchase.purchaseDate = new Date();
    vm.user = Authentication.user;
    vm.save = save;
    vm.getList = getList;
    vm.edit = edit;
    vm.add = add;
    vm.track = track;

    if ($stateParams.id && $stateParams.id != 'new') {
      Restangular.one('api/purchase/' + $stateParams.id).get().then(function(res) {
        console.log(res.data);
        vm.purchase = res.data;
      });
    }

    function getList() {
      Restangular.all('api/purchase').getList().then(function(res) {
        vm.list = res.data;
        // vm.options.totalItems = parseInt(res.headers('total'));
      });
    }


    function save(form) {
      console.log('..................................' + form.purchaseName);
      if (form.$invalid) {
        _.forEach(form.$error, function(err) {
          _.forEach(err, function(frm) {
            frm.$setDirty();
          });
        });
        vm.isSubmitted = true;
        return;
      }

      if (!vm.purchase.id) {
        Restangular.all('api/purchase').post(vm.purchase).then(function(res) {
          swal(vm.purchase.purchaseName, "purchase is saved successfully", "success");
          $state.go('secure.purchases');
        }, function(err) {
          vm.error = err.data.message;
          vm.startProcessing = false;
        });
      } else {
        Restangular.one('api/purchase/' + vm.purchase.id).patch(vm.purchase).then(function(res) {
          // SweetAlert.swal("Material updated successfully!");
          swal(vm.purchase.purchaseName, "purchase is updated successfully", "success");
          $state.go('secure.purchases');
        }, function(err) {
          vm.error = err.data.message;
          vm.startProcessing = false;
        });
      }
    }

    function edit(obj) {
      $state.go('secure.edit-purchases', {
        id: obj.id
      });
    }

    function add(obj) {
      $state.go('secure.product', {
        purchaseId: obj.id
      });
    }

    function track(obj) {
      $state.go('secure.track', {
        purchaseId: obj.id
      });
    }
  }

})();
