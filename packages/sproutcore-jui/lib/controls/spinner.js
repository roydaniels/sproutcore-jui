require('sproutcore-jui/mixins/widget');

var set = SC.set;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Spinner
*/
JUI.Spinner = SC.TextField.extend(JUI.Widget, {
  uiType: 'spinner',
  uiOptions: ['value', 'min', 'max', 'step'],
  uiEvents: ['spin', 'start', 'stop'],
  uiMethods: ['pageDown', 'pageUp', 'stepDown', 'stepUp'],

  spin: function(event, ui) {
    set(this, 'value', ui.value);
  }
});
