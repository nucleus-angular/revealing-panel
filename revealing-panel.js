angular.module('nag.revealingPanel', [
  'nag.core',
  'nag.siteOverlay'
])
.directive('nagRevealingPanel', [
  '$compile',
  'nagDefaults',
  'nagHelper',
  'nagSiteOverlay',
  function($compile, nagDefaults, nagHelper, nagSiteOverlay){
    return {
      restrict: 'EA',
      priority: 1,
      scope: {
        options: '=nagRevealingPanel'
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
        element.find('.handle').attr('ng-click', 'toggle()');
        element.find('.content').attr('ng-class', "{'is-active': panelVisible}");

        return {
          pre: function(scope, element, attributes) {
            scope.options = nagDefaults.getRevealingPanelOptions(scope.options);

            //see if the content for the panel should be coming from a template file
            if(scope.options.contentTemplateUrl) {
              var template = $(nagHelper.getAsyncTemplate(scope.options.contentTemplateUrl, scope.options));
              element.find('.content').html($compile(template)(scope));
            }

            element.addClass('revealing-panel');
            element.find('.content').addClass(scope.options.position);
          },
          post: function(scope, element, attributes) {
            scope.id = nagHelper.generateId('revealing-panel');
            scope.panelVisible = false;

            scope.hide = function() {
              scope.panelVisible = false;

              if(_(scope.options.hideCallback).isFunction()) {
                scope.options.hideCallback();
              }
            };

            scope.show = function() {
              if(_(scope.options.showCallback).isFunction()) {
                scope.options.showCallback();
              }

              scope.panelVisible = true;
            };

            scope.toggle = function() {
              (scope.panelVisible === true) ? scope.hide() : scope.show();
            };

            scope.$watch('panelVisible', function(newValue) {
              if(newValue === true) {
                if(scope.options.hasOverlay === true) {
                  nagSiteOverlay.enable();

                  if(scope.options.overlayClickClose === true) {
                    nagSiteOverlay.addEvent('click', function() {
                      scope.hide();
                    });
                  }
                }
              } else {
                if(scope.options.hasOverlay === true) {
                  nagSiteOverlay.disable();
                }
              }
            }, true);

            if(scope.options.escapeClose === true) {
              $(document).bind('keydown.' + scope.id, function(event) {
                scope.$apply(function() {
                  if(event.which === 27) {
                    scope.hide();
                  }
                });
              });
            }
          }
        };
      }
    };
  }
]);