/**
 * # Revealing Panel
 *
 * This directive provides a way to create a panel that can reveal itself.  If can be used to reveal a panel from all four side (with animations) or from the center of the page (like a page modal window with an overlay).
 *
 * @todo: make content/handle dynamic selector like expander does it
 *
 * EXAMPLES TODO
 *
 * @module nag.revealingPanel
 * @ngdirective nagRevealingPanel
 *
 * @nghtmlattribute {object} nag-revealing-panel Tell AngularJS this element is a revealing panel component and passed object overwrites option defaults
 * @nghtmlattribute {object} data-model The data model to use for the panel's scope
 * @nghtmlattribute {string} data-event TODO
 * @nghtmlattribute {string} data-id Unique name for the revelaing panel
 */
angular.module('nag.revealingPanel')
.directive('nagRevealingPanel', [
  '$compile',
  'nagDefaults',
  'nagHelper',
  '$animate',
  '$rootScope',
  function($compile, nagDefaults, nagHelper, $animate, $rootScope){
    return {
      restrict: 'EA',
      template: nagHelper.template,
      scope: true,
      controller: 'NagRevealingPanelDCtrl',
      compile: function(element, attributes, transclude) {
        if(!attributes.id) {
          throw new Error('HTML data-id attribute must be provides for the directive');
        }

        //for whatever reason dynamically adding angular attributes can't be done in the pre of the return object
        if(attributes.event === 'hover') {
          element.find('.handle').attr('ng-mouseenter', 'mouseEnter($event)');
          element.find('.content').attr('ng-mouseleave', 'mouseLeave($event)');
        } else {
          element.find('.handle').attr('ng-click', 'toggle()');
        }

        //this allow us to make sure we can prevent the content in panel from doing weird shift when being revealed/concealed
        //TODO: research: need to look at this again when we re-implement animations
        element.find('.content').html($('<div class="inner-content"></div>').html(element.find('.content').html()));

        return {
          pre: function(scope, element, attributes) {
            var overlayElement;
            // scope.options = nagDefaults.getOptions('revealingPanel', scope.options);
            scope.options = nagDefaults.getOptions('revealingPanel', attributes);

            //see if the content for the panel should be coming from a template file
            if(scope.options.contentTemplateUrl) {
              var template = $(nagHelper.getAsyncTemplate(scope.options.contentTemplateUrl, scope.options));
              element.find('.inner-content').html($compile(template)(scope));
            }

            //if triggering on hover, override certain options
            if(attributes.event === 'hover') {
              scope.options.closeOnEscape = false;
            }

            element.addClass('revealing-panel');
            element.find('.content').addClass(scope.options.position);

            if(scope.options.hasOverlay === true) {
              overlayElement = $('<div class="site-overlay" ng-class="{\'is-active\': panelVisible}"></div>');

              if(scope.options.closeOnOverlayClick === true) {
                overlayElement.attr('ng-click', 'hide()');
              }

              element.append($compile(overlayElement)(scope));
            }
          },
          post: function(scope, element, attributes) {
            var contentElement = element.find('.content');
            /**
             * Unique id to identify the revealing panel
             *
             * @ngscope
             * @property {string} id
             */
            scope.id = attributes.id;

            /**
             * Whther or not the panel is currently visible
             *
             * @ngscope
             * @property {boolean} panelVisible
             */
            scope.panelVisible = false;

            /**
             * Hides the revealing panel
             *
             * @ngscope
             * @method hide
             */
            scope.hide = function() {
              $animate.removeClass(contentElement, 'reveal');

              scope.panelVisible = false;

              if(_(scope.options.hideCallback).isFunction()) {
                scope.options.hideCallback();
              }
            };

            /**
             * Shows the revealing panel
             *
             * @ngscope
             * @method show
             */
            scope.show = function() {
              $animate.addClass(contentElement, 'reveal', function() {
                //provide a hook to run javascript after the animation as been completed
                $rootScope.$broadcast('NagRevealingPanel[' + scope.id.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');}) +']/animationComplete');
              });

              if(_(scope.options.showCallback).isFunction()) {
                scope.options.showCallback();
              }

              scope.panelVisible = true;
            };

            /**
             * Toggles the display
             *
             * @ngscope
             * @method toggle
             */
            scope.toggle = function() {
              (scope.panelVisible === true) ? scope.hide() : scope.show();
            };

            scope.mouseEnter = function($event) {
              $event.stopPropagation();
              scope.toggle();
            };

            scope.mouseLeave = function($event) {
              $event.stopPropagation();
              scope.toggle();
            };

            if(scope.options.closeOnEscape === true) {
              $(document).bind('keydown.' + scope.id, function(event) {
                if(scope.panelVisible === true) {
                  scope.$evalAsync(function() {
                    if(event.which === 27) {
                      scope.hide();
                    }
                  });
                }
              });
            }

            scope.$watch('panelVisible', function(newValue, oldValue) {
              if(newValue === true) {
                //make sure the position class is applied
                if(!element.hasClass(scope.options.position)) {
                  element.addClass(scope.options.position);
                }

                element.addClass('is-active').addClass();
              } else {
                element.removeClass('is-active');
              }
            });
          }
        };
      }
    };
  }
]);
