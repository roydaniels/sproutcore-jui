/* Application */

Demo = SC.Application.create();

/* Models */

Demo.Tag = SC.Object.extend({
  name: null
});

Demo.availableTags = [
  "ActionScript",
  "AppleScript",
  "Asp",
  "BASIC",
  "C",
  "C++",
  "Clojure",
  "COBOL",
  "ColdFusion",
  "Erlang",
  "Fortran",
  "Groovy",
  "Haskell",
  "Java",
  "JavaScript",
  "Lisp",
  "Perl",
  "PHP",
  "Python",
  "Ruby",
  "Scala",
  "Scheme"
];

/* Views */

Demo.StepSlider = JUI.Slider.extend({
  step: 10,
  max: 50,
  min: 0
});

Demo.StepSpinner = JUI.Spinner.extend({
  step: 10,
  max: 50,
  min: 0
});

/* Controllers */

Demo.dialogsController = SC.Object.create({
  
  openInfoDialog: function() {
    JUI.AlertDialog.info('Hello World!');
  },

  openErrorDialog: function() {
    JUI.AlertDialog.error('Error!');
  },

  openConfirmDialog: function() {
    JUI.ConfirmDialog.notify(this, 'didConfirm').open('Are you sure?');
  },

  didConfirm: function(value) {
    JUI.AlertDialog.info('The answer is %@'.fmt(value));
  }

});

Demo.tagsController = SC.ArrayProxy.create({
  content: [],
  addTag: function(name) {
    var tag = Demo.Tag.create({name: name});
    this.pushObject(tag);
  },
  removeTag: function(e) {
    this.removeObject(e.getPath('parentView.content'));
  },
  openDialog: function() {
    Demo.Dialog.open();
  }
});

Demo.progressbarController = SC.Object.create({
  progress: 20
});

Demo.sliderController = SC.Object.create({
  value: 0
});

Demo.sortableController = SC.ArrayProxy.create({
  content: Demo.availableTags
});

Demo.Buttons = SC.View.extend({
  didInsertElement: function() {
    this.$('div, a, button, input').button();
  }
})
