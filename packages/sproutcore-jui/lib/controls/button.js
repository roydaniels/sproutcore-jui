require('sproutcore-jui/mixins/widget');

var get = SC.get;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Button
*/
JUI.Button = SC.Button.extend(JUI.Widget, {
  uiType: 'button',
  uiOptions: ['label', '_icons'],

  isActiveBinding: SC.Binding.oneWay('.disabled'),

  _icons: function() {
    var icons = {};
    icons.primary = get(this, 'icon');
    if (icons.primary) {
      icons.primary = 'ui-icon-'.fmt(icons.primary);
    }
    return icons;
  }.property('icon').cacheable()
});
