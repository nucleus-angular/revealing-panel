angular.module('nag.revealingPanel.panel', [
  'nag.core'
])
.directive('nagRevealingPanel', [
  '$compile',
  '$animator',
  'nagDefaults',
  'nagHelper',
  function($compile, $animator, nagDefaults, nagHelper){
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
        element.find('.content').attr('ng-animate', "{show: 'fade-in', hide: 'fade-out'}");
        element.find('.content').attr('nag-revealing-panel-content', '');

        return {
          pre: function(scope, element, attributes) {
            var overlayElement;
            scope.options = nagDefaults.getRevealingPanelOptions(scope.options);

            //see if the content for the panel should be coming from a template file
            if(scope.options.contentTemplateUrl) {
              var template = $(nagHelper.getAsyncTemplate(scope.options.contentTemplateUrl, scope.options));
              element.find('.content').html($compile(template)(scope));
            }

            element.addClass('revealing-panel');
            element.find('.content').addClass(scope.options.position);

            if(scope.options.hasOverlay === true) {
              overlayElement = $('<div class="site-overlay" ng-if="panelVisible" ng-animate="\'fade\'" ng-class="{\'is-active\': panelVisible}"></div>');

              if(scope.options.overlayClickClose === true) {
                overlayElement.attr('ng-click', 'hide()');
              }

              element.append($compile(overlayElement)(scope));
            }

            element.find('.content').css({
              marginTop: ((element.find('.content').outerHeight() / 2) * -1),
              marginLeft: ((element.find('.content').outerWidth() / 2) * -1)
            });
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