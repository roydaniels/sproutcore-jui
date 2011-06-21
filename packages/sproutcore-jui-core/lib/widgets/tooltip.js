(function() {
var get = SC.get, set = SC.set;

/*
 * JUI.Tooltip
 */

JUI.Tooltip = SC.Mixin.create({
  tooltip: '',
  hasTooltip: NO,

  // @private
  toggleTooltip: function() {
    var flag = get(this, 'hasTooltip'),
        ui = get(this, 'tooltipWidget');
    if (flag && !ui) {
      ui = this.$().tooltip({
        content: get(this, 'tooltipTemplate')
      }).tooltip('widget');
      set(this, 'tooltipWidget', ui);
    } else if (ui) {
      ui._destroy();
    }
  }.observes('hasTooltip'),

  // @private
  tooltipTemplate: function() {
    return SC.Handlebars.compile(get(this, 'tooltip'));
  }.property('tooltip').cacheable()

});

})();
