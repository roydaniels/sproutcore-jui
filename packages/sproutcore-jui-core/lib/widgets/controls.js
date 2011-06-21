(function() {
var get = SC.get, set = SC.set;

/*
 * JUI.Button
 */

JUI.Button = SC.Button.extend(JUI.Widget, {
  uiType: 'button',
  uiOptions: ['label'],

  isActiveBinding: SC.Binding.oneWay('.disabled')
});

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
    if (value !== null && value !== undefined) {
      set(this, 'value', parseInt(value));
    }
    return get(this, 'value');
  }.property('value').cacheable()
});

/*
 * JUI.Spinner
 */

JUI.Spinner = JUI.TextField.extend({
  uiType: 'spinner',
  uiOptions: ['value', 'min', 'max', 'step'],
  uiEvents: ['spin', 'start', 'stop'],
  uiMethods: ['pageDown', 'pageUp', 'stepDown', 'stepUp'],

  spin: function(event, ui) {
    set(this, 'value', ui.value);
  }
});

})();
