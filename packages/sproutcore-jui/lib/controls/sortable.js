require('sproutcore-jui/mixins/widget');

var get = SC.get, set = SC.set;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.SortableCollectionView
*/
JUI.SortableCollectionView = SC.CollectionView.extend(JUI.Widget, {
  uiType: 'sortable',
  uiEvents: ['start', 'stop'],

  draggedStartPos: null,

  start: function(event, ui) {
    set(this, 'dragging', true);
    set(this, 'draggedStartPos', ui.item.index());
  },

  stop: function(event, ui) {
    var oldIdx = get(this, 'draggedStartPos');
    var newIdx = ui.item.index();
    if (oldIdx != newIdx) {
      var content = get(this, 'content');
      content.beginPropertyChanges();
      var el = content.objectAt(oldIdx);
      content.removeAt(oldIdx);
      content.insertAt(newIdx, el);
      content.endPropertyChanges();
    }
    set(this, 'dragging', false);
  },

  // @private
  // Overriding these to prevent CollectionView from reapplying content array modifications
  arrayWillChange: function(content, start, removedCount, addedCount) {
    if (get(this, 'dragging')) {
      //this._super(content, 0, 0, 0);
    } else {
      this._super(content, start, removedCount, addedCount);
    }
  },

  // @private
  arrayDidChange: function(content, start, removedCount, addedCount) {
    if (get(this, 'dragging')) {
      //this._super(content, 0, 0, 0);
    } else {
      this._super(content, start, removedCount, addedCount);
    }
  }
});
