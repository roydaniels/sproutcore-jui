var set = SC.set;

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
