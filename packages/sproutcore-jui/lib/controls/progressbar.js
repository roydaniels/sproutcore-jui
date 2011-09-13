require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/jquery-ui/jquery.ui.progressbar');

var get = SC.get, set = SC.set, none = SC.none;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.ProgressBar
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
