require('sproutcore-jui/jquery-ui/autocomplete-html');
require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/mixins/target_support');

var get = SC.get;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.AutocompleteTextField
*/
JUI.AutocompleteTextField = SC.TextField.extend(JUI.Widget, JUI.TargetSupport, {
  uiType: 'autocomplete',
  uiOptions: ['source', 'delay', 'position', 'minLength', 'html'],
  uiEvents: ['select', 'focus', 'open', 'close'],

  select: function(event, ui) {
    if (ui.item) {
      this.executeAction(get(this, 'action'), ui.item.value);
      event.target.value = '';
      event.preventDefault();
    }
  }
});
