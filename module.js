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
      contentTemplateUrl: null
    });
  }
]);;