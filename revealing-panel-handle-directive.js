/**
 * # Revealing Panel Handle
 *
 * A revealing panel handle that can be used to display a revealing panel.
 *
 * EXAMPLES TODO
 *
 * @module nag.revealingPanel
 * @ngdirective nagRevealingPanelHandle
 *
 * @nghtmlattribute {null|stringf} nag-revealing-panel-handle Nothing if a child of a revealing panel directive but a string of the data-id of the panel you want this to control is not a child of a revealing panel directive
 */
angular.module('nag.revealingPanel')
.directive('nagRevealingPanelHandle', [
  '$compile',
  function($compile){
    return {
      restrict: 'EA',
      require: '?^nagRevealingPanel',
      compile: function(element, attributes, transclude) {
        element.addClass('reveal-panel-handle');

        return function($scope, element, attributes, controller) {
          //using $evalAsync in case the handle in defined before the panel it is to control
          $scope.$evalAsync(function() {
            var panelScope;

            if(!controller) {
              panelScope = angular.element($('[data-id="' + attributes.nagRevealingPanelHandle + '"] .content')).scope();
            } else {
              panelScope = $scope;
            }

            if(!panelScope.options.event) {
              throw Error('Can not locate revealing panel for this handle');
            }

            element.attr('ng-click', 'toggle()');
            element.removeAttr('nag-revealing-panel-handle');

            element.replaceWith($compile(element[0].outerHTML)(panelScope));
          });
        }
      }
    };
  }
]);
