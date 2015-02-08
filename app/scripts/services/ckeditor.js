'use strict';

goog.require('cgAdmin.homeModule');

cgAdmin.homeModule.ckeditorGo = function() {

  CKEDITOR.plugins.add('timestamp', {
    icons: 'timestamp',
    init: function(editor) {
      editor.addCommand('insertTimestamp', {
        exec: function(editor) {
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

cgAdmin.homeModule.run(cgAdmin.homeModule.ckeditorGo);
