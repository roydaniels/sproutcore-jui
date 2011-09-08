require('sproutcore-jui/jquery-ui/autocomplete');
require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/mixins/target_support');

var get = SC.get;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.AutocompleteItem
*/
JUI.AutocompleteItem = SC.View.extend({
  tagName: 'li',
  defaultTemplate: SC.Handlebars.compile('<a>{{content.label}}</a>'),
  didInsertElement: function() {
    this._super();
    this.$().data('item.autocomplete', {
      value: this.getPath('content.value'),
      label: this.getPath('content.label')
    });
    this.get('widget').menu.refresh();
  }
});

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.AutocompleteTextField
*/
JUI.AutocompleteTextField = SC.TextField.extend(JUI.Widget, JUI.TargetSupport, {
  uiType: 'sc_autocomplete',
  uiOptions: ['_source', 'delay', 'autoFocus', 'position', 'minLength', 'itemViewClass'],
  uiEvents: ['select', 'focus', 'open', 'close'],

  itemViewClass: JUI.AutocompleteItem,
  requestContent: SC.K,
  content: [],

  _source: function() {
    var source = this.get('source');
    if (source) {
      this.set('content', source);
      return source;
    } else {
      return $.proxy(this, '_requestContent');
    }
  }.property('source').cacheable(),

  _requestContent: function (data, callback) {
    this._lastCallback = callback;
    this.requestContent(data);
  },

  _contentDidChange: function() {
    if (this._lastCallback) {
      this._lastCallback(this.get('content'));
      this._lastCallback = null;
    }
  }.observes('content'),

  select: function(event, ui) {
    if (ui.item) {
      this.executeAction(get(this, 'action'), ui.item.value);
      event.preventDefault();
    }
  }
});
