if ('undefined' === typeof JUI) {

/**
  @namespace
  @name JUI
  @version 1.0.alpha
*/
 JUI = {};

// aliases needed to keep minifiers from removing the global context
if ('undefined' !== typeof window) {
  window.JUI = JUI;
}

}

/**
  @static
  @type String
  @default '1.0.alpha'
  @constant
*/
JUI.VERSION = '1.0.alpha';
