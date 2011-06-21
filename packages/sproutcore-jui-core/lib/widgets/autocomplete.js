/*
 * JUI.AutocompleteTextField
 */

JUI.AutocompleteTextField = JUI.TextField.extend(SC.TargetSupport, {
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
