require('sproutcore-jui/mixins/widget');

var set = SC.set;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Slider
*/
JUI.Slider = SC.View.extend(JUI.Widget, {
  uiType: 'slider',
  uiOptions: ['value', 'min', 'max', 'step', 'orientation', 'range'],
  uiEvents: ['slide', 'start', 'stop'],

  slide: function(event, ui) {
    set(this, 'value', ui.value);
  }
});
