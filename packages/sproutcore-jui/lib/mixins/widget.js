require('sproutcore-jui/core');

var get = SC.get, set = SC.set, none = SC.none;

/**
  @mixin
  @since SproutCore JUI 1.0
  @extends JUI.Widget
*/
JUI.Widget = SC.Mixin.create({

  uiWidget: function() {
    return jQuery.ui[this.get('uiType')];
  }.property().cacheable(),

  didInsertElement: function() {
    this._super();
    var options = this._gatherOptions();
    this._gatherEvents(options);

    var ui = get(this, 'uiWidget')(options, get(this, 'element'));
    set(this, 'ui', ui);
  },

  willDestroyElement: function() {
    var ui = get(this, 'ui');
    if (ui) {
      var observers = this._observers;
      for (var prop in observers) {
        if (observers.hasOwnProperty(prop)) {
          this.removeObserver(prop, observers[prop]);
        }
      }
      ui._destroy();
    }
  },

  didCreateWidget: SC.K,

  concatenatedProperties: ['uiEvents', 'uiOptions', 'uiMethods'],

  uiEvents: ['create'],
  uiOptions: ['disabled'],
  uiMethods: [],

  _gatherEvents: function(options) {
    var uiEvents = get(this, 'uiEvents');

    uiEvents.forEach(function(eventType) {
      var eventHandler = eventType === 'create' ? this.didCreateWidget : this[eventType];
      if (eventHandler) {
        options[eventType] = $.proxy(function(event, ui) {
          eventHandler.call(this, event, ui);
        }, this);
      }
    }, this);
  },

  _gatherOptions: function() {
    var uiOptions = get(this, 'uiOptions'),
        options = {},
        defaultOptions = get(this, 'uiWidget').prototype.options;

    uiOptions.forEach(function(key) {
      var value = get(this, key),
          uiKey = key.replace(/^_/, '');
      if (!none(value)) {
        options[uiKey] = value;
      } else {
        set(this, key, defaultOptions[uiKey]);
      }

      var observer = function() {
        var value = get(this, key);
            ui = get(this, 'ui');
        if (ui.options[uiKey] != value) {
          ui._setOption(uiKey, value);
        }
      };

      this.addObserver(key, observer);
      //this._observers = this._observers || {};
      //this._observers[key] = observer;
    }, this);

    return options;
  }
});
