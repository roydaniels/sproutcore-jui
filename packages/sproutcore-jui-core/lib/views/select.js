var get = SC.get, set = SC.set, getPath = SC.getPath;

SC.Option = SC.View.extend({

  tagName: 'option',

  defaultTemplate: SC.Handlebars.compile('{{title}}'),

  attributeBindings: ['value'],

  value: function() {
    var content = get(this, 'content'),
        valueKey = getPath(this, 'parentView.itemValueKey');

    return (valueKey) ? (content.get ? get(content, valueKey) : content[valueKey]) : content;
  }.property('content', 'parentView.itemValueKey').cacheable(),

  title: function() {
    var content = get(this, 'content'),
        nameKey = getPath(this, 'parentView.itemTitleKey');

    return nameKey ? (content.get ? get(content, nameKey) : content[nameKey]) : content.toString();
  }.property('content', 'parentView.itemTitleKey').cacheable()

});

SC.Select = SC.CollectionView.extend({

  classNames: ['sc-select'],

  itemTitleKey: null,

  itemValueKey: null,

  defaultValue: null,

  itemViewClass: SC.Option,

  tagName: 'select',

  multipleBinding: '.content.allowsMultipleSelection',

  attributeBindings: ['multiple'],

  focusOut: function(event) {
    this._elementValueDidChange();
    return false;
  },

  change: function(event) {
    this._elementValueDidChange();
    return false;
  },

  keyUp: function(event) {
    this._elementValueDidChange();
    return false;
  },

  _elementValueDidChange: function() {
    set(this, 'value', this.$().val());
  },

  _valueDidChange: function() {
    SC.run.once(this, this._updateElementValue);
  }.observes('value'),

  _updateElementValue: function() {
    this.$().val(get(this, 'value'));
  }

});
