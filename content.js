/**
 * Content element for the revealing panel component
 *
 * @module nag.revealingPanel.content
 * @ngdirective nagRevealingPanelContent
 *
 * @nghtmlattribute {empty} nag-revealing-panel-content Tells AngularJS this element is the revealing panel content component
 */
angular.module('nag.revealingPanel.content', [
  'nag.core'
])
.directive('nagRevealingPanelContent', [
  function(/*$animator*/){
    return {
      restrict: 'EA',
      compile: function(element, attributes, transclude) {
        //used to make sure the animation does not play on initial load
        var initialLoad = false;
        return {
          post: function(scope, element, attributes) {
            //var animator = $animator(scope, attributes);

            /**
             * Trigger 'reveal'/'conceal' animations when the panel visibility changes
             *
             * @ngwatch panelVisible
             */
            scope.$watch('panelVisible', function(newValue) {
              //don't play the animation on initial load
              if(initialLoad === true) {
                //using custom animate values because we don't want to have the default behaviour that show/hide enter/leave have
                if(newValue === true) {
                  //animator.animate('reveal', element);
                  //$animator.addClass(element, 'reveal');
                } else {
                  //animator.animate('conceal', element);
                  //$animator.addClass(element, 'conceal');
                }
              } else {
                //we can now play animations for this element
                initialLoad = true;
              }
            });
          }
        };
      }
    };
  }
]);