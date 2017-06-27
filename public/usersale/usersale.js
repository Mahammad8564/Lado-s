(function() {

  'use strict';

  angular.module('lados').controller('UserSaleController', UserSaleController);

  UserSaleController.$inject = ['Authentication', 'Restangular', '$state', '$q', '$scope'];

  function UserSaleController(Authentication, Restangular, $state, $q, $scope) {
    var vm = this;
    var user = Authentication.user;
    vm.addNew = addNew;
    vm.getDataByUserId = getDataByUserId;
    vm.removeColumn = removeColumn;
    vm.setInvoiceDetail = setInvoiceDetail;
    vm.productArry = [{}];
    vm.sale = {};
    vm.sale.purchase = [];

    function addNew(index) {
      vm.productArry.push({});
    }

    function removeColumn(index) {
      vm.productArry.splice(index, 1);
    }

    function getDataByBranch() {
      Restangular.one('api/branch/' + user.BranchId).get().then(function(res) {
        vm.branch = res.data;
      });
    }

    function getDataByUserId() {
      Restangular.one('api/sale/product/' + user.id).get().then(function(res) {
        vm.alreadySale = res.data;
      });
    }

    function setInvoiceDetail() {
      vm.sale.date = Date.now();
      vm.sale.InvoiceId = Date.now();
      vm.sale.UserId = user.id;
    }

    function getAllProductByBranch() {
      Restangular.one('api/product/getByBranchId/' + user.BranchId).get().then(function(res) {
        vm.InStock = res.data;
      });
    }

    function getAllSoldItemByBranch() {
      Restangular.one('api/sold/' + user.BranchId).get().then(function(res) {
        vm.Sold = res.data;
      });
    }

    function getUnSoldItemByBranch() {
      Restangular.one('api/product/unsoldList/' + user.BranchId).get().then(function(res) {
        vm.UnSoldItem = res.data;
      });
    }

    $scope.productCodeChange = function productCodeChange(index) {
      vm.sale.purchase[index].price = '';
      vm.sale.purchase[index].productName = '';
    }
    $scope.productCodeBlur = function productCodeBlur(productCode, index) {
      if (productCode.length > 0) {
        Restangular.one('api/sale/getByProductCode/' + productCode).get().then(function(res) {
          var purchaseData = {
            ProductId: res.data.id,
            productName: res.data.productName,
            productCode: res.data.productCode,
            price: res.data.unitPrice
          };
          vm.sale.qty = 1;
          vm.sale.purchase[index] = purchaseData;
        }, function(err) {
          return;
        });
      } else {
        console.log('blenk');
      }
    }

    $scope.save = function(form) {
      if (form.$invalid) {
        _.forEach(form.$error, function(err) {
          _.forEach(err, function(frm) {
            frm.$setDirty();
          });
        });
        vm.isSubmitted = true;
        return;
      } else {
        Restangular.all('api/sale').post(vm.sale).then(function(res) {
          swal(vm.sale.customerName, "sale is saved successfully", "success");
          $state.go('secureUser.sale');

        }, function(err) {
          vm.error = err.data.message;
          vm.startProcessing = false;
        });
      }
    }

    function activet() {
      setInvoiceDetail();
      getUnSoldItemByBranch();
      getDataByBranch();
      getAllProductByBranch();
      getAllSoldItemByBranch();
    }
    activet();
  }

})();
