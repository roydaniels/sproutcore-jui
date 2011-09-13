require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/jquery-ui/jquery.ui.throbber');

/*
 * JUI.Throbber 
 */

JUI.Throbber = SC.View.extend(JUI.Widget, {
  uiType: 'throbber',
  uiOptions: ['segments', 'space', 'length', 'width',
    'speed', 'align', 'valign', 'padding', 'autoStart', 'outside']
});
