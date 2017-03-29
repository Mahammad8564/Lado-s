(function () {
    'use strict';

    angular.module('lados')
        .config(routeConfig)
        .run(highLightMenu);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                title: 'Login',
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $state.go('secure.home');
                    }
                }],
            })

            .state('secure', {
                url: '/secure',
                templateUrl: '/shared/secure.html',
                title: 'Secure',
                controller: 'SecureController',
                controllerAs: 'vm',
                abstract: true,
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $state.go('login');
                    }
                }],
            })
            .state('secure.home', {
                url: '/home',
                templateUrl: '/home/home.html',
                title: 'Home',
                highlight: 'home',
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .state('secure.category', {
                url: '/category',
                templateUrl: '/category/category.html',
                title: 'Category',
                highlight: 'category',
                controller: 'CategoryController',
                controllerAs: 'vm'
            })
            .state('secure.edit-category', {
                url: '/category/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/category/edit-category.html',
                title: 'Category',
                highlight: 'category',
                controller: 'CategoryController',
                controllerAs: 'vm'
            })


            .state('secure.inventory', {
                url: '/inventory',
                templateUrl: '/inventory/inventory.html',
                title: 'Inventory',
                highlight: 'inventory',
                controller: 'InventoryController',
                controllerAs: 'vm'
            })
            .state('secure.manageInventory', {
                url: '/manageInventory',
                templateUrl: '/inventory/manageInventory/manageInventory.html',
                title: 'Manage Inventory',
                highlight: 'manageInventory',
                controller: 'ManageInventoryController',
                controllerAs: 'vm'
            })
            .state('secure.purchases', {
                url: '/purchases',
                templateUrl: '/inventory/purchases/purchases.html',
                title: 'Purchases',
                highlight: 'purchases',
                controller: 'PurchasesController',
                controllerAs: 'vm'
            })
            .state('secure.edit-purchases', {
                url: '/purchases/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/inventory/purchases/edit-purchases.html',
                title: 'Purchases',
                highlight: 'purchases',
                controller: 'PurchasesController',
                controllerAs: 'vm'
            })
            .state('secure.product', {
                url: '/product',
                templateUrl: '/inventory/purchases/product/product.html',
                title: 'Product',
                highlight: 'product',
                controller: 'ProductController',
                controllerAs: 'vm'
            })
            .state('secure.edit-product', {
                url: '/product/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/inventory/purchases/product/edit-product.html',
                title: 'Product',
                highlight: 'product',
                controller: 'ProductController',
                controllerAs: 'vm'
            })

            .state('secure.sales', {
                url: '/sales',
                templateUrl: '/inventory/sales/sales.html',
                title: 'Sales',
                highlight: 'sales',
                controller: 'SalesController',
                controllerAs: 'vm'
            })

            .state('secure.branch', {
                url: '/branch',
                templateUrl: '/branch/branch.html',
                title: 'Branch',
                highlight: 'branch',
                controller: 'BranchController',
                controllerAs: 'vm'
            })
            .state('secure.edit-branch', {
                url: '/branch/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/branch/edit-branch.html',
                title: 'Branch',
                highlight: 'branch',
                controller: 'BranchController',
                controllerAs: 'vm'
            })
            //==================================================================


            .state('secure.dashboard', {
                url: '/dashboard',
                templateUrl: '/dashboard/dashboard.html',
                title: 'Dashboard',
                highlight: 'dashboard',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })

            .state('secure.reports', {
                url: '/reports',
                templateUrl: '/reports/reports.html',
                title: 'Reports',
                highlight: 'reports',
                controller: 'ReportsController',
                controllerAs: 'vm'
            })

            .state('secure.notifications', {
                url: '/notifications',
                templateUrl: '/notifications/notifications.html',
                title: 'Notifications',
                highlight: 'notifications',
                controller: 'NotificationsController',
                controllerAs: 'vm'
            })
            .state('secure.invoice', {
                url: '/invoice',
                templateUrl: '/order/invoice.html',
                title: 'Invoice',
                highlight: 'invoice',
                controller: 'OrderController',
                controllerAs: 'vm'
            })

            .state('secure.user', {
                url: '/user',
                templateUrl: '/user/user.html',
                title: 'User',
                highlight: 'user',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('secure.edit-user', {
                url: '/user/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/user/edit-user.html',
                title: 'User',
                highlight: 'user',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('secure.reset-user', {
                url: '/user/{id}/reset',
                templateUrl: '/user/reset-user.html',
                title: 'User',
                highlight: 'user',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            ;

        $urlRouterProvider.otherwise('/login');
    }

    function highLightMenu($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;

        });
    }

})();
