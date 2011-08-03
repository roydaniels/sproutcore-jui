require('sproutcore-jui/jquery-ui/throbber');
require('sproutcore-jui/mixins/widget');

/*
 * JUI.Throbber 
 */

JUI.Throbber = SC.View.extend(JUI.Widget, {
  uiType: 'throbber',
  uiOptions: ['segments', 'space', 'length', 'width',
    'speed', 'align', 'valign', 'padding', 'autoStart', 'outside']
});
