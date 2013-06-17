angular.module('nag.revealingPanel.content', [
  'nag.core'
])
.directive('nagRevealingPanelContent', [
  '$animator',
  function($animator){
    return {
      restrict: 'EA',
      compile: function(element, attributes, transclude) {
        //used to make sure the animation does not play on initial load
        var initialLoad = false;
        return {
          post: function(scope, element, attributes) {
            var animator = $animator(scope, attributes);

            scope.$watch('panelVisible', function(newValue) {
              //don't play the animation on initial load
              if(initialLoad === true) {
                //using custom animate values because we don't want to have the default behaviour that show/hide enter/leave have
                if(newValue === true) {
                  animator.animate('reveal', element);
                } else {
                  animator.animate('conceal', element);
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