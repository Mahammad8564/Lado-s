var mainApplicationModuleName = 'lados';
var mainApplicationModule = angular.module(mainApplicationModuleName , 
    [
        'ui.router',
        'restangular',
        'oitozero.ngSweetAlert',
        'ngAnimate',
        'ngFileUpload',
        'ui.bootstrap',
        'toastr',
        'chart.js'  
])
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }]);
  
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

if (window.location.hash === '#_=_')
    window.location.hash = '#!';

mainApplicationModule.config(['$locationProvider','RestangularProvider', function ($locationProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');
    RestangularProvider.setFullResponse(true);
    }]);
