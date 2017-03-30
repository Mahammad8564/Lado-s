(function () {
    'use strict';

    angular.module('lados').controller('BranchController', BranchController);

    BranchController.$inject = ['Authentication', 'Restangular', '$state', 'SweetAlert', '$stateParams'];

    function BranchController(Authentication, Restangular, $state, SweetAlert, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        vm.save = save;
        vm.getList = getList;
        vm.edit = edit;

        if ($stateParams.id && $stateParams.id != 'new') {
            Restangular.one('api/branch/' + $stateParams.id).get().then(function (res) {
                console.log(res.data);
                vm.branch = res.data;
            });
        }

        function getList() {
            Restangular.all('api/branch').getList().then(function (res) {
                vm.list = res.data;
                // vm.options.totalItems = parseInt(res.headers('total'));
            });
        }


        function save(form) {

            if (form.$invalid) {
                _.forEach(form.$error, function (err) {
                    _.forEach(err, function (frm) {
                        frm.$setDirty();
                    });
                });
                vm.isSubmitted = true;
                return;
            }

            if (!vm.branch.id) {
                Restangular.all('api/branch').post(vm.branch).then(function (res) {
                    SweetAlert.swal("Material saved successfully!");
                    $state.go('secure.branch');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/branch/' + vm.branch.id).patch(vm.branch).then(function (res) {
                    SweetAlert.swal("Material updated successfully!");
                    $state.go('secure.branch');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

        function edit(obj) {
            $state.go('secure.edit-branch', { id: obj.id });
        }
    }

})();