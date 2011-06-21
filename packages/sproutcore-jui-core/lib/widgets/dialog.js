(function() {
var get = SC.get, set = SC.set;

/*
 * JUI.Dialog
 */

JUI.Dialog = SC.View.extend(JUI.Widget, SC.TargetSupport, {
  uiType: 'dialog',
  uiEvents: ['beforeClose'],
  uiOptions: ['title', '_buttons', 'position', 'closeOnEscape',
    'modal', 'draggable', 'resizable', 'autoReposition',
    'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'],
  uiMethods: ['open', 'close'],

  isOpen: NO,

  message: '',
  icon: null,
  buttons: [],

  _iconClassNames: function() {
    var icon = get(this, 'icon');
    if (icon) {
      return "ui-icon ui-icon-%@".fmt(icon === 'error' ? 'alert' : icon);
    }
    return '';
  }.property('icon').cacheable(),

  _stateClassNames: function() {
    var icon = get(this, 'icon');
    if (icon === 'error') {
      return 'ui-state-error';
    } else if (icon === 'info') {
      return 'ui-state-highlight';
    }
    return '';
  }.property('icon').cacheable(),

  defaultTemplate: SC.Handlebars.compile('<p {{bindAttr class="_stateClassNames"}}>\
    <span {{bindAttr class="_iconClassNames"}}></span>{{message}}</p>'),

  _buttons: function() {
    var buttons = [],
        target = get(this, 'targetObject');
    get(this, 'buttons').forEach(function(button) {
      var action = button.action,
          context = this;
      if (!this[action] && target) {
        context = target;
      }
      buttons.push({
        text: button.label,
        click: function(event) {
          if (context && context[action]) {
            context[action].call(context, event);
          }
        }
      });
    }, this);
    return buttons;
  }.property('buttons').cacheable(),

  _open: function() {
    set(this, 'isOpen', YES);
    this.didOpenDialog();
  },

  _close: function() {
    set(this, 'isOpen', NO);
    this.didCloseDialog();
  },

  open: function() {
    this._insertElementLater(SC.K);
    this._open();
  },

  didInsertElement: function() {
    get(this, 'ui')._bind({
      dialogopen: $.proxy(this._open, this),
      dialogclose: $.proxy(this._close, this)
    });
  },

  close: SC.K,
  didOpenDialog: SC.K,
  didCloseDialog: SC.K
});

JUI.Dialog.close = function() {
  $('.ui-dialog-content:visible').dialog('close');
};

var alertDialog, confirmDialog;

JUI.AlertDialog = JUI.Dialog.extend({
  buttons: [{label: 'OK', action: 'close'}],
  resizable: NO,
  draggable: NO,
  modal: YES
});

JUI.AlertDialog.open = function(message, title, type) {
  if (!alertDialog) {
    alertDialog = JUI.AlertDialog.create();
  }
  set(alertDialog, 'title', title ? title : null);
  set(alertDialog, 'message', message);
  set(alertDialog, 'icon', type);
  alertDialog.open();
};

JUI.AlertDialog.info = function(message, title) {
  JUI.AlertDialog.open(message, title, 'info');
};

JUI.AlertDialog.error = function(message, title) {
  JUI.AlertDialog.open(message, title, 'error');
};

JUI.ConfirmDialog = JUI.AlertDialog.extend({
  buttons: [
    {label: 'YES', action: 'didConfirm'},
    {label: 'NO', action: 'close'}
  ],
  response: NO,
  didConfirm: function() {
    set(this, 'response', YES);
    this.close();
  },
  didCloseDialog: function() {
    this.executeAction(get(this, 'action'), get(this, 'response'));
    set(this, 'response', NO);
  }
});

JUI.ConfirmDialog.notify = function(target, action) {
  if (!confirmDialog) {
    confirmDialog = JUI.ConfirmDialog.create();
  }
  set(confirmDialog, 'target', target);
  set(confirmDialog, 'action', action);
  return this;
};

JUI.ConfirmDialog.open = function(message, title) {
  if (!confirmDialog) {
    confirmDialog = JUI.ConfirmDialog.create();
  }
  set(confirmDialog, 'title', title ? title : null);
  set(confirmDialog, 'message', message);
  confirmDialog.open();
};

// SC.$(document).ready(function() {
//   $('body').append('<div id="sc-dialogs" style="visibility:hidden;width:1px;height:1px;opacity:0;"></div>')
// });

})();
