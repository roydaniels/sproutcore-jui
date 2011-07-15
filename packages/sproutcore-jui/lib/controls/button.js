require('sproutcore-jui/mixins/widget');

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Button
*/
JUI.Button = SC.Button.extend(JUI.Widget, {
  uiType: 'button',
  uiOptions: ['label'],

  isActiveBinding: SC.Binding.oneWay('.disabled')
});
