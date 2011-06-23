/*
 * JUI.ResizableView
 */

JUI.ResizableView = SC.View.extend(JUI.Widget, {
  uiType: 'resizable',
  uiEvents: ['start', 'stop', 'resize'],
  uiOptions: ['aspectRatio', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'containment', 'autoHide']
});
