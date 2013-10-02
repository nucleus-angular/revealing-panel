/*******************************************************************************************************/
/* I THINK THIS CAN BE REMOVED BECAUSE OF THE ANIMATION CHANGE IN THE LATEST RC WHICH REMOVES THE NEED */
/* FOR THIS AS THIS WAS NEEDED ONLY TO BE ABLE TO APPLY ANIMATIONS WHICH NOT CAN BE DONE EASIER ********/
/*******************************************************************************************************/
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