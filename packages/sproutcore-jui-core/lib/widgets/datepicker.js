(function() {
var get = SC.get, set = SC.set;

/*
 * JUI.Datepicker
 */

JUI.Datepicker = JUI.TextField.extend({
  uiType: 'datepicker',
  uiOptions: ['dateFormat', 'maxDate', 'minDate', 'defaultDate'],
  uiEvents: ['onSelect'],

  date: function(key, value) {
    var ui = get(this, 'ui');
    if (value != undefined) {
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
      return $(elem).datepicker(options).datepicker('widget');
    };
    datepicker.prototype.options = $.datepicker._defaults;
    return datepicker;
  }.property().cacheable(),

  // @private
  onSelect: function(dateText, ui) {
    this.select.call(this, dateText, ui);
  },

  select: SC.K
});

JUI.Datepicker.formatDate = $.datepicker.formatDate;
JUI.Datepicker.parseDate = $.datepicker.parseDate;

})();
