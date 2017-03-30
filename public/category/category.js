(function () {
    'use strict';

    angular.module('lados').controller('CategoryController', CategoryController);

    CategoryController.$inject = ['Authentication', 'Restangular', '$state', '$stateParams'];

    function CategoryController(Authentication, Restangular, $state, $stateParams) {
        var vm = this;
        vm.user = Authentication.user;
        console.log(vm.user);
        vm.save = save;
        vm.getList = getList;
        vm.edit = edit;

        if ($stateParams.id && $stateParams.id != 'new') {
            Restangular.one('api/category/' + $stateParams.id).get().then(function (res) {
                console.log(res.data);
                vm.category = res.data;
            });
        }

        function getList() {
            Restangular.all('api/category').getList().then(function (res) {
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

            if (!vm.category.id) {
                Restangular.all('api/category').post(vm.category).then(function (res) {
                    swal(vm.category.categoryName, "category is saved successfully.", "success");
                    $state.go('secure.category');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
            else {
                Restangular.one('api/category/' + vm.category.id).patch(vm.category).then(function (res) {
                    swal(vm.category.categoryName, "category is updated successfully.", "success");
                    $state.go('secure.category');
                }, function (err) {
                    vm.error = err.data.message;
                    vm.startProcessing = false;
                });
            }
        }

        function edit(obj) {
            $state.go('secure.edit-category', { id: obj.id });
        }
    }

})();