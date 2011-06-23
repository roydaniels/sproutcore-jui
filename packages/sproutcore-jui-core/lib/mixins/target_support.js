(function() {

var get = SC.get;

// FIXME: Ugly hack because of collections buffered rendering...
// SC.CollectionView.reopen({
//   _updateElements: function(content, start, removed, added) {
//     this._super(content, start, removed, added);
//     var idx, views = get(this, 'childViews'), len = start+added;
//     for (idx = start; idx < len; idx++) {
//       views[idx]._notifyWillInsertElement();
//       views[idx]._notifyDidInsertElement();
//     }
//   }
// });

/*
 * SC.TargetSupport
 */

JUI.TargetSupport = SC.Mixin.create({

  // @private
  targetObject: function() {
    var target = get(this, 'target');

    if (SC.typeOf(target) === 'string') {
      return SC.getPath(this, target);
    } else {
      return target;
    }
  }.property('target').cacheable(),

  // @private
  executeAction: function() {
    var args = $.makeArray(arguments),
        action = args.shift(),
        target = get(this, 'targetObject');
    if (target && action) {
      if (SC.typeOf(action) === 'string') {
        action = target[action];
      }
      action.apply(target, args);
    }
  }

});

//SC.Button.reopen(SC.TargetSupport);

})();
