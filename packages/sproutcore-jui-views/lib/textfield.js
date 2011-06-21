
SC.TextField.reopen({
  // FIXME: if null, "null" text will be rendered
  placeholder: '',

  // FIXME: observes value changes
  _valueDidChange: function() {
    SC.run.once(this, this._updateElementValue);
  }.observes('value')
});
