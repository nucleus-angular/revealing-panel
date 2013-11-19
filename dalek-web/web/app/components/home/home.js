angular.module('app.home.home', [
  'app.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('app.home.home', {
      url: '',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.revealingPanelDefaultOptions = {};
  $scope.revealingPanelLeftOptions = {
    position: 'left'
  };
  $scope.revealingPanelRightOptions = {
    position: 'right'
  };
  $scope.revealingPanelTopOptions = {
    position: 'top'
  };
  $scope.revealingPanelBottomOptions = {
    position: 'bottom'
  };
  $scope.revealingPanelCenterOptions = {
    position: 'center'
  };
  $scope.revealingCloseOnEscapeOptions = {
    closeOnEscape: true
  };
  $scope.revealingDontCloseOnEscapeOptions = {
    closeOnEscape: false
  };
  $scope.revealingCloseOnOverlayClickOptions = {
    closeOnOverlayClick: true
  };
  $scope.revealingDontCloseOnOverlayClickOptions = {
    closeOnOverlayClick: false
  };
  $scope.revealingHasOverlayOptions = {
    hasOverlay: true
  };
  $scope.revealingNoOverlayOptions = {
    hasOverlay: false
  };
  $scope.revealingContentExternalTemplateOptions = {
    contentTemplateUrl: '/app/components/home/assets/templates/content-external-template.html'
  };
}]);
