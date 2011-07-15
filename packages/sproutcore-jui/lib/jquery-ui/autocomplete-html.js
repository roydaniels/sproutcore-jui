/*
 * jQuery UI Autocomplete HTML Extension
 *
 * Copyright 2010, Scott González (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */

var proto = jQuery.ui.autocomplete.prototype,
  initSource = proto._initSource,
  escapeRegex = jQuery.ui.autocomplete.escapeRegex;

function filter(array, term) {
  var matcher = new RegExp(escapeRegex(term), 'i');
  return jQuery.grep(array, function(value) {
    return matcher.test(jQuery('<div>').html(value.label || value.value || value).text());
  });
}

jQuery.extend(proto, {
  _initSource: function() {
    if (this.options.html && jQuery.isArray(this.options.source)) {
      this.source = function(request, response) {
        response(filter( this.options.source, request.term));
      };
    } else {
      initSource.call(this);
    }
  },

  _renderItem: function(ul, item) {
    return jQuery('<li></li>')
      .data('item.autocomplete', item)
      .append(jQuery('<a></a>')[this.options.html ? 'html' : 'text'](item.label))
      .appendTo(ul);
  }
});
