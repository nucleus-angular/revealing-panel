/**
 * # Revealing Panel
 *
 * This directive provides a way to create a panel that can reveal itself.  If can be used to reveal a panel from all four side (with animations) or from the center of the page (like a page modal window with an overlay).
 *
 * EXAMPLES TODO
 *
 * @module nag.revealingPanel.panel
 * @ngdirective nagRevealingPanel
 *
 * @nghtmlattribute {object} nag-revealing-panel Tell AngularJS this element is a revealing panel component and passed object overwrites option defaults
 * @nghtmlattribute {object} data-model The data model to use for the panel's scope
 */
angular.module('nag.revealingPanel.panel', [
  'ngAnimate',
  'nag.core'
])
.directive('nagRevealingPanel', [
  '$compile',
  'nagDefaults',
  'nagHelper',
  function($compile, nagDefaults, nagHelper){
    return {
      restrict: 'EA',
      priority: 1,
      scope: {
        options: '=?nagRevealingPanel',
        model: '=?'
      },
      controller: [
        '$scope',
        function($scope) {
          //need to unbind the global events
          $scope.$on('$destroy', function() {
            $(document).unbind('keydown.' + $scope.id);
          });
        }
      ],
      compile: function(element, attributes, transclude) {
        //for whatever reason dynamically adding angular attributes can't be done in the pre of the return object
        if(attributes.event === 'hover') {
          element.find('.handle').attr('ng-mouseenter', 'mouseEnter($event)');
          element.find('.content').attr('ng-mouseleave', 'mouseLeave($event)');
        } else {
          element.find('.handle').attr('ng-click', 'toggle()');
        }

        element.find('.content').attr('ng-class', "{'is-active': panelVisible}");

        //this allow us to make sure we can prevent the content in panel from doing weird shift when being revealed/concealed
        element.find('.content').html($('<div class="inner-content"></div>').html(element.find('.content').html()));

        return {
          pre: function(scope, element, attributes) {
            var overlayElement;
            /**
             * Options for revealing panel (default pull from object is passed in as value for nag-revealing-panel attribute)
             *
             * @ngscope
             * @property {object} options
             *   @property {string} [options.contentTemplateUrl] Remote url for where the content for the panel is
             *   @property {string} [options.position="right"] Position of the panel
             *   @property {string} [options.rootTemplatePath=""] Path added to the revealing panel request for remote templates
             *   @property {boolean} [options.escapeClose=true] Whether to close panel on escape key
             *   @property {boolean} [options.hasOverlay=true] Whether to show an overlay with the panel
             *   @property {boolean} [options.overlayClickClose=true] Whether to close the panel when the overlay it clicked
             */
            scope.options = nagDefaults.getRevealingPanelOptions(scope.options);

            //if triggering on hover, override certain options
            if(attributes.event === 'hover') {
              scope.options.escapeClose = false;
              scope.options.hasOverlay = false;
            }

            //see if the content for the panel should be coming from a template file
            if(scope.options.contentTemplateUrl) {
              var template = $(nagHelper.getAsyncTemplate(scope.options.contentTemplateUrl, scope.options));
              element.find('.inner-content').html($compile(template)(scope));
            }

            element.addClass('revealing-panel');
            element.find('.content').addClass(scope.options.position);

            if(scope.options.hasOverlay === true) {
              overlayElement = $('<div class="site-overlay" ng-class="{\'is-active\': panelVisible}"></div>');

              if(scope.options.overlayClickClose === true) {
                overlayElement.attr('ng-click', 'hide()');
              }

              element.append($compile(overlayElement)(scope));
            }

            if(scope.options.position === 'center') {
              element.find('.content').css({
                marginTop: ((element.find('.content').outerHeight() / 2) * -1),
                marginLeft: ((element.find('.content').outerWidth() / 2) * -1)
              });
            }
          },
          post: function(scope, element, attributes) {

            /**
             * Unique id to identify the revealing panel
             *
             * @ngscope
             * @property {string} id
             */
            scope.id = nagHelper.generateId('revealing-panel');

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

            if(scope.options.escapeClose === true) {
              $(document).bind('keydown.' + scope.id, function(event) {
                if(scope.panelVisible === true) {
                  scope.$apply(function() {
                    if(event.which === 27) {
                      scope.hide();
                    }
                  });
                }
              });
            }
          }
        };
      }
    };
  }
]);