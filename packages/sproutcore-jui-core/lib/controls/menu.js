/*
 * JUI.Menu
 */

JUI.Menu = SC.CollectionView.extend(JUI.Widget, {
  uiType: 'menu',
  uiEvents: ['select'],

  tagName: 'ul',

  arrayDidChange: function(content, start, removed, added) {
    this._super(content, start, removed, added);

    var ui = SC.get(this, 'ui');
    if (ui) { ui.refresh(); }
  }
});
