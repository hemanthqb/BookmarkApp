var app = app || {};

(function($) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    app.AddBookmarkView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#add-bookmark-dialog',
        listtemplate: _.template($('#folderdropdown').html()),

        // Delegated events for add/delete bookmarks
        events: {
            'click #add-bookmark': 'addbookmark'
        },

        initialize: function() {
            this.$folderlist = $(this.el).find('#path');
            this.$url = $(this.el).find('#url');
            this.$urlerrorlabel = $(this.el).find('#url-error');
            this.$titleerrorlabel = $(this.el).find('#title-error');
            this.$urlinputgroup = $(this.el).find('#addbook-input-group');
            this.$titleinputgroup = $(this.el).find('#title-input-group');
            this.$title = $(this.el).find('#title');

            this.listenTo(app.bookmarklist, 'change', _.debounce(this.render, 0));
        },

        render: function() {
            this.$folderlist.html(this.listtemplate({
                list: app.bookmarklist.getallfolders()
            }));
        },

        //handler for add bookmark button click
        addbookmark: function() {
            var url = this.$url.val();
            var title = this.$title.val();
            var folder = this.$folderlist.val();

            this.erroroff(this.$urlinputgroup, this.$urlerrorlabel);
            this.erroroff(this.$titleinputgroup, this.$titleerrorlabel);
            if (this.validatetitle(title)) {
                if (this.validateurl(url)) {
                    this.insertbookmark(title, url, folder);
                    this.close();
                } else {
                    this.erroron(this.$urlinputgroup, this.$urlerrorlabel);
                }
            } else {
                this.erroron(this.$titleinputgroup, this.$titleerrorlabel);
            }
        },

        close: function() {
            $("#addbookclose").click()
        },

        insertbookmark: function(title, url, folder) {
            app.bookmarklist.addbookmark(title, url, folder);
            app.bookmarklist.refreshtree();
            this.$url.val('');
            this.$title.val('');
            this.$folderlist.val('/');
        },

        erroron: function($group, $label) {
            $group.addClass('has-error');
            $label.show();
        },

        erroroff: function($group, $label) {
            $group.removeClass('has-error');
            $label.hide();
        },

        validateurl: function(url) {
            var re = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/
            return re.test(url);
        },

        validatetitle: function(title) {
            return title != '';
        },
    });
})(jQuery);