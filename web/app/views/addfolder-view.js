var app = app || {};

(function($) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    app.AddFolderView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#add-folder-dialog',

        // Delegated events for add folder dialog
        events: {
            'click #add-bookmark': 'addfolderclick',
        },

        initialize: function() {
            this.$foldername = $(this.el).find('#foldername');
            this.$inputgroup = $(this.el).find('#urlgroup');
            this.$errortext = $(this.el).find('#folder-error');
            this.$mainaddfolderbtn = $('#add-folder-btn');
        },

        //handler for add bookmark button click
        addfolderclick: function() {
            var folder_name = this.$foldername.val();
            var re = /^[a-zA-Z].*/;
            this.erroroff();
            console.log(folder_name);
            if (folder_name && re.test(folder_name)) {
                if (!app.bookmarklist.hasfolder(folder_name)) {
                    this.insertfolder(folder_name);
                    $('#folder-dialog-close').click();
                } else {
                    this.erroron('folder name already exist');
                }
            } else {
                this.erroron('please enter a valid folder name');
            }
        },

        //insert folder method
        insertfolder: function(folder_name) {
            app.bookmarklist.addfolder(folder_name);
            app.bookmarklist.refreshtree();
            this.$foldername.val('');
        },

        //switch on the error below the input
        erroron: function(text) {
            this.$inputgroup.addClass('has-error');
            this.$errortext.show();
            this.$errortext.text(text);
        },

        //switch off the error below the input
        erroroff: function() {
            this.$inputgroup.removeClass('has-error');
            this.$errortext.hide();
        }
    });
})(jQuery);