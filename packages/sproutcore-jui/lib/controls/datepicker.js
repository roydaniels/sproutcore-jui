require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/jquery-ui/jquery.ui.datepicker');

var get = SC.get, set = SC.set, none = SC.none;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Datepicker
*/
JUI.Datepicker = SC.TextField.extend(JUI.Widget, {
  uiType: 'datepicker',
  uiOptions: ['dateFormat', 'maxDate', 'minDate', 'defaultDate'],
  uiEvents: ['onSelect'],

  date: function(key, value) {
    var ui = get(this, 'ui');
    if (!none(value)) {
      ui.setDate(value);
    }
    return ui.getDate();
  }.property('value').cacheable(),

  open: function() {
    get(this, 'ui').show();
  },

  close: function() {
    get(this, 'ui').hide();
  },

  // @private
  uiWidget: function() {
    var datepicker = function(options, elem) {
      return SC.$(elem).datepicker(options).datepicker('widget');
    };
    datepicker.prototype.options = SC.$.datepicker._defaults;
    return datepicker;
  }.property().cacheable(),

  // @private
  onSelect: function(dateText, ui) {
    this.select();
  },

  select: SC.K
});

JUI.Datepicker.formatDate = SC.$.datepicker.formatDate;
JUI.Datepicker.parseDate = SC.$.datepicker.parseDate;
