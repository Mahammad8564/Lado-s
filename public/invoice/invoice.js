(function() {
  'use strict';

  angular.module('lados').controller('invoiceController', invoiceController);

  invoiceController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

  function invoiceController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
    var vm = this;
    vm.user = Authentication.user;
    vm.getList = getList;
    vm.activate = activate;
    vm.exportToPdf = exportToPdf;

    function getList() {
      Restangular.one('api/sale/invoice/' + $stateParams.InvoiceId).get().then(function(res) {
        vm.invoice = res.data;
        vm.total = 0
        _.forEach(vm.invoice, function(List, key) {
          vm.total += List.Product.unitPrice;
        });
      });
    }


    function exportToPdf() {
      html2canvas(document.getElementById('myInvoice'), {
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
          pdfMake.createPdf(docDefinition).download(vm.invoice[0].customerName + '-' + vm.invoice[0].InvoiceId + ".pdf");
        }
      });
    }

    function activate() {
      vm.getList();
    }

    vm.activate();
  }

})();
