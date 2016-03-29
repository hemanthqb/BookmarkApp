var app = app || {};

(function ($) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '.bookmarkapp',

		// Delegated events for add/remove/delete bookmarks
		events: {
      'click #add-bookmark':'addBookmark',
      'click #delete-bookmark':'deleteBookmark'
		},

		initialize: function () {

		},

		render: function () {

		},

    //handler for add bookmark button click
    addBookmark:function(){
    
    },

    //handler for delete bookmark button click
    deleteBookmark:function(){

    }
	});
})(jQuery);
