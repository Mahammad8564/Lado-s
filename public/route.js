(function() {
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
        onEnter: ['$state', 'Authentication', function($state, Authentication) {
          if (Authentication.isAuthenticated()) {
            if (Authentication.isAdmin()) {
              $state.go('secure.dashboard');
            } else {
              $state.go('secureUser.dashboard');
            }
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
        onEnter: ['$state', 'Authentication', function($state, Authentication) {
          if (!Authentication.isAuthenticated()) {
            $state.go('login');
          }
        }],
      })
      .state('secureUser', {
        url: '/secureUser',
        templateUrl: '/shared/secureUser.html',
        title: 'secureUser',
        controller: 'secureUserController',
        controllerAs: 'vm',
        abstract: true,
        onEnter: ['$state', 'Authentication', function($state, Authentication) {
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
      .state('secure.edit-home', {
        url: '/home/{id}',
        params: {
          id: {
            value: 'new'
          }
        },
        templateUrl: '/home/edit-home.html',
        title: 'Home',
        highlight: 'dashboard',
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
          id: {
            value: 'new'
          }
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
        highlight: 'inventory',
        controller: 'ManageInventoryController',
        controllerAs: 'vm'
      })
      .state('secure.purchases', {
        url: '/purchases',
        templateUrl: '/inventory/purchases/purchases.html',
        title: 'Purchases',
        highlight: 'inventory',
        controller: 'PurchasesController',
        controllerAs: 'vm'
      })
      .state('secure.edit-purchases', {
        url: '/purchases/{id}',
        params: {
          id: {
            value: 'new'
          }
        },
        templateUrl: '/inventory/purchases/edit-purchases.html',
        title: 'Purchases',
        highlight: 'inventory',
        controller: 'PurchasesController',
        controllerAs: 'vm'
      })
      .state('secure.track', {
        url: '/purchases/{purchaseId}/track',
        params: {
          purchaseId: null
        },
        templateUrl: '/inventory/purchases/track/track.html',
        title: 'Track',
        highlight: 'inventory',
        controller: 'TrackController',
        controllerAs: 'vm'
      })
      .state('secure.product', {
        url: '/purchases/{purchaseId}/product',
        params: {
          purchaseId: null
        },
        templateUrl: '/inventory/purchases/product/product.html',
        title: 'Product',
        highlight: 'inventory',
        controller: 'ProductController',
        controllerAs: 'vm'
      })
      .state('secure.edit-product', {
        url: '/purchases/{purchaseId}/product/{id}',
        params: {
          purchaseId: null,
          id: {
            value: 'new'
          }
        },
        templateUrl: '/inventory/purchases/product/edit-product.html',
        title: 'Product',
        highlight: 'inventory',
        controller: 'ProductController',
        controllerAs: 'vm'
      })

      .state('secure.sales', {
        url: '/sales',
        templateUrl: '/inventory/sales/sales.html',
        title: 'Sales',
        highlight: 'inventory',
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
          id: {
            value: 'new'
          }
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
      .state('secureUser.dashboard', {
        url: '/Dashboard',
        templateUrl: '/userDashboard/userDashboard.html',
        title: 'Dashboard',
        highlight: 'dashboard',
        controller: 'UserDashboardController',
        controllerAs: 'vm'
      })
      .state('secureUser.sale', {
        url: '/sale',
        templateUrl: '/usersale/usersale.html',
        title: 'Sale',
        highlight: 'sale',
        controller: 'UserSaleController',
        controllerAs: 'vm'
      })


      .state('secureUser.edit-sale', {
        url: '/sale/{id}',
        params: {
          id: {
            value: 'new'
          }
        },
        templateUrl: '/usersale/edit-usersale.html',
        title: 'Sale',
        highlight: 'sale',
        controller: 'UserSaleController',
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

      .state('secureUser.reports', {
        url: '/userreports',
        templateUrl: '/userReports/userreports.html',
        title: 'Reports',
        highlight: 'reports',
        controller: 'userReportsController',
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
      .state('secureUser.invoice', {
        url: '/invoice/{InvoiceId}',
        params: {
          InvoiceId: null
        },
        templateUrl: '/invoice/invoice.html',
        title: 'Invoice',
        highlight: 'sale',
        controller: 'invoiceController',
        controllerAs: 'vm'
      })
      .state('secure.invoice', {
        url: '/invoice/{InvoiceId}',
        params: {
          InvoiceId: null
        },
        templateUrl: '/invoice/invoice.html',
        title: 'Invoice',
        highlight: 'inventory',
        controller: 'invoiceController',
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
          id: {
            value: 'new'
          }
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
      });


    $urlRouterProvider.otherwise('/login');
  }

  function highLightMenu($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $rootScope.toState = toState;

    });
  }

})();
