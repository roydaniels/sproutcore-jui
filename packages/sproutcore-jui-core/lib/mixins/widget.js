/*
 * jQuery UI Widgets for Sproutcore20
 *
 * http://github.com/tchak/sproutcore-jquery-ui
 */

var get = SC.get, set = SC.set, none = SC.none;

JUI = SC.Object.create();

JUI.Widget = SC.Mixin.create({

  uiWidget: function() {
    return jQuery.ui[this.get('uiType')];
  }.property().cacheable(),

  didInsertElement: function() {
    var options = this._gatherOptions();
    this._gatherEvents(options);

    var ui = get(this, 'uiWidget')(options, get(this, 'element'));
    set(this, 'ui', ui);

    this._defineMethods();
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

  uiEvents: [],
  uiOptions: [],
  uiMethods: [],

  _gatherEvents: function(options) {
    var uiEvents = get(this, 'uiEvents');
    uiEvents.push('create');

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
    uiOptions.push('disabled');

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
      this._observers = this._observers || {};
      this._observers[key] = observer;
    }, this);

    return options;
  },

  _defineMethods: function() {
    var uiMethods = get(this, 'uiMethods'),
        ui = get(this, 'ui');
    uiMethods.forEach(function(methodName) {
      this[methodName] = function() {
        return ui[methodName]();
      };
    }, this);
  }
});
