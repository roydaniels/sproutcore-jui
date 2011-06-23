/*
 * JUI.AutocompleteTextField
 */

JUI.AutocompleteTextField = SC.TextField.extend(JUI.Widget, JUI.TargetSupport, {
  uiType: 'autocomplete',
  uiOptions: ['source', 'delay', 'position', 'minLength', 'html'],
  uiEvents: ['select', 'focus', 'open', 'close'],

  select: function(event, ui) {
    if (ui.item) {
      this.executeAction(SC.get(this, 'action'), ui.item.value);
      event.target.value = '';
      event.preventDefault();
    }
  }
});
