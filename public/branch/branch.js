(function () {
    'use strict';

    angular.module('lados').controller('BranchController', BranchController);

    BranchController.$inject = ['Authentication', 'Restangular', '$state', '$stateParams'];

    function BranchController(Authentication, Restangular, $state, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        vm.save = save;
        vm.getList = getList;
        vm.edit = edit;
        vm.search = search;
        vm.order = order;
        vm.pageChange = pageChange;
        vm.options = {
            pagesize: 10,
            totalItems: 0,
            page: 1,
            search: ''
        }

        if ($stateParams.id && $stateParams.id != 'new') {
            Restangular.one('api/branch/' + $stateParams.id).get().then(function (res) {
                console.log(res.data);
                vm.branch = res.data;
            });
        }

        function getList() {
            Restangular.all('api/branch').getList(vm.options).then(function (res) {
                vm.list = res.data;
                vm.options.totalItems = parseInt(res.headers('total'));
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
                    swal(vm.branch.branchName, "barnch is saved successfully", "success");
                    $state.go('secure.branch');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/branch/' + vm.branch.id).patch(vm.branch).then(function (res) {
                    swal(vm.branch.branchName, "branch is updated successfully", "success");
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

        function pageChange() {
            getList();
        }
        function search() {
            vm.options.page = 1;
            vm.options.where = 'branchName;$like|s|%' + vm.options.search + '%';
            getList();
        }

        function order(col, ord) {
            if (vm.asc != undefined) {
                var cp = angular.copy(vm.asc[col]);
                vm.asc = {};
                vm.asc[col] = !cp;
            } else {
                vm.asc = {};
                vm.asc[col] = !vm.asc[col];
            }
            var ascL = vm.asc[col] ? 'asc' : 'desc';
            vm.options.sort = col + ' ' + ascL;
            vm.options.page = 1;
            getList();
        }
    }

})();