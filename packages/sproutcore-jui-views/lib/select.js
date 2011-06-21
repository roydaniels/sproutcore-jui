
(function() {

var get = SC.get, set = SC.set;

// FIXME: Ugly hack because of collections buffered rendering...
SC.CollectionView.reopen({
  _updateElements: function(content, start, removed, added) {
    this._super(content, start, removed, added);
    var idx, views = get(this, 'childViews'), len = start+added;
    for (idx = start; idx < len; idx++) {
      views[idx]._notifyWillInsertElement();
      views[idx]._notifyDidInsertElement();
    }
  }
});

SC.Option = SC.View.extend({

  tagName: 'option',

  defaultTemplate: SC.Handlebars.compile('{{title}}'),

  attributeBindings: ['value'],

  value: function() {
    var content = this.get('content'),
        valueKey = this.getPath('parentView.itemValueKey');

    // get the value using the valueKey or the object
    return (valueKey) ? (content.get ? content.get(valueKey) : content[valueKey]) : content;
  }.property('content', 'parentView.itemValueKey').cacheable(),

  title: function() {
    var content = this.get('content'),
        nameKey = this.getPath('parentView.itemTitleKey'),
        // get the localization flag.
        shouldLocalize = this.getPath('parentView.localize');
    //Get the name value. If value key is not specified convert obj
    //to string
    return nameKey ? (content.get ? content.get(nameKey) : content[nameKey]) : content.toString();
  }.property('content', 'parentView.itemTitleKey').cacheable()

});

SC.Select = SC.CollectionView.extend({

  classNames: ['sc-select'],

  itemTitleKey: null,

  itemValueKey: null,

  //localize: true,

  defaultValue: null,

  itemViewClass: SC.SelectOption,

  tagName: 'select',

  multipleBinding: '.content.allowsMultipleSelection',

  attributeBindings: ['multiple', 'value'],

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
  }

});

})();

