require('sproutcore-jui/mixins/widget');

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.ResizableView
*/
JUI.ResizableView = SC.View.extend(JUI.Widget, {
  uiType: 'resizable',
  uiEvents: ['start', 'stop', 'resize'],
  uiOptions: ['aspectRatio', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'containment', 'autoHide']
});
