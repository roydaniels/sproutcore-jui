var get = SC.get, set = SC.set, none = SC.none;

/*
 * JUI.Slider
 */

JUI.Slider = SC.View.extend(JUI.Widget, {
  uiType: 'slider',
  uiOptions: ['value', 'min', 'max', 'step', 'orientation', 'range'],
  uiEvents: ['slide', 'start', 'stop'],

  slide: function(event, ui) {
    set(this, 'value', ui.value);
  }
});

/*
 * JUI.ProgressBar
 */

JUI.ProgressBar = SC.View.extend(JUI.Widget, {
  uiType: 'progressbar',
  uiOptions: ['_value', 'max'],
  uiEvents: ['change', 'complete'],

  _value: function(key, value) {
    if (!none(value)) {
      set(this, 'value', parseInt(value));
    }
    return parseInt(get(this, 'value'));
  }.property('value').cacheable()
});

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
