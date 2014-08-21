angular.module('nag.revealingPanel')
.controller('NagRevealingPanelDCtrl', [
  '$scope',
  function($scope) {
    //need to unbind the global events
    $scope.$on('$destroy', function() {
      $(document).unbind('keydown.' + $scope.id);
    });
  }
]);
