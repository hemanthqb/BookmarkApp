var app = app || {};

(function($) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    app.BookmarkView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '.bookmarkapp',

        // Delegated events for add/delete bookmarks
        events: {
            'click #delete': 'delete'
        },

        initialize: function() {
            this.$container = $(this.el).find('#bookmark-view');
            this.$container.igTree({
                bindings: {
                    textKey: "name",
                    valueKey: "id",
                    nodeContentTemplate: $('#foldernode').html(),

                    childDataProperty: "childrens",
                    bindings: {
                        nodeContentTemplate: $('#foldernode').html(),
                        textKey: "name",
                        valueKey: "id"
                    }
                },

                dragAndDrop: true,
                dragStart: this.dragStart.bind(this),
                nodeClick: this.nodeClick.bind(this),
                nodeDropped: this.nodeDropped.bind(this),
                dragAndDropSettings: {
                    customDropValidation: this.customDropValidation
                }
            });
            this.$deletebtn = $(this.el).find('#delete');
            this.listenTo(app.bookmarklist, 'refresh-tree', _.debounce(this.render, 0));
            this.delete = this.delete.bind(this);
        },

        customDropValidation: function(element) {
            // Validates the drop target:
            // Disallow dropping a node on bookmark
            var dropTarget = $(this);

            if (dropTarget.attr('type') == 'bookmark') {
                return false;
            }
            return true;
        },

        dragStart: function(evt, node) {
            //preventing folder drag
            if (!node.data.url) {
                evt.preventDefault();
            } else {
                this.draggedelement = node;
            }
        },
        nodeClick: function(evt, ui) {
            if (ui.node.data) {
                this.$deletebtn.prop('disabled', false);
                this.selectednode = ui.node;
                if (ui.node.data.type = 'bookmark') {
                    var index = ui.node.data.url.startsWith('http') || ui.node.data.url.startsWith('https');
                    $('#clicktrigger').attr('href', index ? ui.node.data.url : ('//' + ui.node.data.url));
                    $('#clicktrigger')[0].click();
                }
            }
        },

        nodeDropped: function(evt, ui) {
            app.bookmarklist.setall(_.clone(this.listdata));
        },

        render: function() {
            this.listdata = app.bookmarklist.getall();
            this.$container.igTree({
                dataSource: this.listdata, //JSON Array defined above
            });
        },

        //handler for delete bookmark button click
        delete: function() {
            if (this.selectednode) {
                if (this.selectednode.data.url) {
                    //app.bookmarksroot.deletebookmark(this.selectednode.id);
                    var parentnode = this.$container.igTree('parentNode', this.selectednode.element);
                    if (parentnode) {
                        var parentnodedata = this.$container.igTree('nodeFromElement', parentnode);
                        var index = parseInt(this.selectednode.path.split('_')[1]);
                        app.bookmarklist.deletebookmark(parentnodedata.data.id, index);
                    } else {
                        app.bookmarklist.deletefolder(this.selectednode.data.id);
                    }
                } else {
                    app.bookmarklist.deletefolder(this.selectednode.data.id);
                }
            }
        },

    });
})(jQuery);