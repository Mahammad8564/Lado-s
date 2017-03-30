var mainApplicationModuleName = 'lados';
var mainApplicationModule = angular.module(mainApplicationModuleName , 
    [
        'ui.router',
        'restangular',
        'oitozero.ngSweetAlert',
        'ngAnimate',
        'ngFileUpload',
        'ui.bootstrap',
        'angularjs-dropdown-multiselect',
        'toastr'
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

if (window.location.hash === '#_=_')
    window.location.hash = '#!';

mainApplicationModule.config(['$locationProvider','RestangularProvider', function ($locationProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');
    RestangularProvider.setFullResponse(true);
    }]);
