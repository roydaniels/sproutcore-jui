require('sproutcore-jui/jquery-ui/dialog-resizable');
require('sproutcore-jui/mixins/widget');
require('sproutcore-jui/mixins/target_support');

var get = SC.get, set = SC.set;

/**
  @class
  @since SproutCore JUI 1.0
  @extends JUI.Dialog
*/
JUI.Dialog = SC.View.extend(JUI.Widget, JUI.TargetSupport, {
  uiType: 'dialog',
  uiEvents: ['beforeClose'],
  uiOptions: ['title', '_buttons', 'position', 'closeOnEscape',
    'modal', 'draggable', 'resizable', 'autoReposition',
    'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'],
  uiMethods: ['open', 'close'],

  isOpen: false,

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
    set(this, 'isOpen', true);
    this.didOpenDialog();
  },

  _close: function() {
    set(this, 'isOpen', false);
    this.didCloseDialog();
  },

  open: function() {
    this._insertElementLater(SC.K);
    this._open();
  },

  didInsertElement: function() {
    this._super();
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
  resizable: false,
  draggable: false,
  modal: true
});

JUI.AlertDialog.reopenClass({
  open: function(message, title, type) {
    if (!alertDialog) {
      alertDialog = JUI.AlertDialog.create();
    }
    set(alertDialog, 'title', title ? title : null);
    set(alertDialog, 'message', message);
    set(alertDialog, 'icon', type);
    alertDialog.open();
  },

  info: function(message, title) {
    JUI.AlertDialog.open(message, title, 'info');
  },

  error: function(message, title) {
    JUI.AlertDialog.open(message, title, 'error');
  }
});

JUI.ConfirmDialog = JUI.AlertDialog.extend({
  buttons: [
    {label: 'YES', action: 'didConfirm'},
    {label: 'NO', action: 'close'}
  ],
  didConfirm: function() {
    get(this, 'answer').resolve();
    this.close();
  },
  didCloseDialog: function() {
    var answer = get(this, 'answer');
    if (answer && !answer.isResolved()) {
      answer.reject();
    }
    set(this, 'answer', null);
  }
});

JUI.ConfirmDialog.reopenClass({
  open: function(message, title) {
    if (!confirmDialog) {
      confirmDialog = JUI.ConfirmDialog.create();
    }
    var answer = SC.$.Deferred();
    set(confirmDialog, 'answer', answer);
    set(confirmDialog, 'title', title ? title : null);
    set(confirmDialog, 'message', message);
    confirmDialog.open();
    return answer.promise();
  }
});
