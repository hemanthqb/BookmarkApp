var app = app || {};

(function($) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    app.AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '.bookmarkapp',

        initialize: function() {
            //initializing nessary views
            new app.AddBookmarkView();
            new app.AddFolderView();
            new app.BookmarkView();

            //fecthing result from api
            app.bookmarklist.fetch({
                success: function() {
                    //refresh treeview when result is available,change event is not used
                    //for treeview render since it is interfering with user experiance
                    app.bookmarklist.refreshtree();
                }
            });
        }
    });
})(jQuery);