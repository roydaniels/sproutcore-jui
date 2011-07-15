require('sproutcore-jui/core');

var get = SC.get;

/**
  @mixin
  @since SproutCore JUI 1.0
  @extends JUI.TargetSupport
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
    var args = SC.$.makeArray(arguments),
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
