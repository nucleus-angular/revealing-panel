/**
 * # Revealing Panel Module
 *
 * This module contain the revealing panel components.
 *
 * @module nag.revealingPanel
 */
angular.module('nag.revealingPanel', [
  'ngAnimate',
  'nag.core'
])
.config([
  '$injector',
  function($injector) {
    var spacing = '50';
    var styleSheetIndex;
    var ruleIndex;

    //cache indexes so we don't have to search on the resize event
    _.forEach(document.styleSheets, function(styleSheet, sIndex) {
      if(!styleSheetIndex && styleSheetIndex !== 0) {
        _.forEach(styleSheet.rules, function(rule, rIndex) {
          if(!ruleIndex && ruleIndex !== 0 && rule.selectorText === '.revealing-panel.center > .content') {
            styleSheetIndex = sIndex;
            ruleIndex = rIndex;
          }
        });
      }
    });

    var initialMaxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - (spacing * 2);
    document.styleSheets[styleSheetIndex].rules[ruleIndex].style.maxHeight = initialMaxHeight + 'px';

    $(window).bind('resize.revealingPanel', function() {
      var newMaxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - (spacing * 2);
      document.styleSheets[styleSheetIndex].rules[ruleIndex].style.maxHeight = newMaxHeight + 'px';
    });
  }
])
.run([
  'nagDefaults',
  function(nagDefaults) {
    /**
     * @ignore Property definations for revealing panel directive.
     *
     * @module nagRevealingPanel
     */
    /**
     * Options for revealing panel (default pull from object is passed in as value for nag-revealing-panel attribute)
     *
     * @ngscope
     * @property {object} options
     *   @property {string} [options.position="right"] Position of the panel
     *   @property {boolean} [options.closeOnEscape=true] Whether to close panel on escape key (has no effect when data-event is hover)
     *   @property {boolean} [options.hasOverlay=true] Whether to show an overlay with the panel (has no effect when data-event is hover)
     *   @property {boolean} [options.closeOnOverlayClick=true] Whether to close the panel when the overlay it clicked (has no effect when data-event is hover)
     */
    nagDefaults.setOptions('revealingPanel', {
      position: 'right',
      closeOnEscape: true,
      hasOverlay: true,
      closeOnOverlayClick: false,
      contentTemplateUrl: null,
      event: 'click'
    });
  }
]);
