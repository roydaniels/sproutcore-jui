var set = SC.set;

/*
 * JUI.Spinner
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
