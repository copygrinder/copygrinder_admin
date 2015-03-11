'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.editorConfig');

cgAdmin.homeModule.ckeditorGo = function () {

  CKEDITOR.plugins.add('timestamp', {
    icons: 'timestamp',
    init: function (editor) {
      editor.addCommand('insertTimestamp', {
        exec: function (editor) {
          var now = new Date();
          editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
        }
      });
      editor.ui.addButton('Timestamp', {
        label: 'Insert Timestamp',
        command: 'insertTimestamp',
        toolbar: 'insert'
      });
    }
  });

  CKEDITOR.stylesSet.add('default', [
    {
      name: 'Image caption',
      element: 'div',
      'attributes': {
        'class': 'caption-mine'
      }
    },
    {
      name: 'Other caption',
      element: 'div',
      'attributes': {
        'class': 'sorta-mine'
      }
    }
  ]);

};

cgAdmin.editorConfig = {
  'height': 150,
  'width': 'auto',
  'extraPlugins': 'timestamp',
  'plugins':
  'basicstyles,' +
  'blockquote,' +
  'clipboard,' +
  'contextmenu,' +
  'dialogadvtab,' +
  'div,' +
  'elementspath,' +
  'enterkey,' +
  'entities,' +
  'find,' +
  'flash,' +
  'floatingspace,' +
  'format,' +
  'horizontalrule,' +
  'htmlwriter,' +
  'link,' +
  'list,' +
  'liststyle,' +
  'maximize,' +
  'newpage,' +
  'pagebreak,' +
  'pastefromword,' +
  'pastetext,' +
  'preview,' +
  'removeformat,' +
  'resize,' +
  'showblocks,' +
  'showborders,' +
  'sourcearea,' +
  'specialchar,' +
  'stylescombo,' +
  'tab,' +
  'table,' +
  'tabletools,' +
  'toolbar,' +
  'undo,' +
  'wysiwygarea',
  'customConfig': '',
  'toolbar': 'custom',
  'toolbar_custom': [ //jshint ignore:line
    {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', 'Underline', 'Subscript', 'Superscript']},
    {name: 'paragraph', items: ['BulletedList', 'NumberedList', 'Blockquote']},
    {name: 'links', items: ['Link', 'Unlink']},
    {name: 'tools', items: ['Find', 'Replace', 'Maximize']},
    '/',
    {name: 'styles', items: ['Format', 'PasteText', 'PasteFromWord', 'RemoveFormat']},
    {name: 'insert', items: ['Table', 'HorizontalRule', 'SpecialChar', 'CreateDiv']},
    {name: 'clipboard', items: ['Undo', 'Redo']},
    {name: 'document', items: ['PageBreak', 'Source']}
  ]
};

cgAdmin.homeModule.run(cgAdmin.homeModule.ckeditorGo);
