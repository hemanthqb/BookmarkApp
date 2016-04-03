var app = app || {};

(function () {
	'use strict';

	// basic interface for folders and bookmark item
	app.BookmarkList = Backbone.Model.extend({

		defaults: {
			//represents userid, it is static for now
			id:12345,

			//root array for folders and bookmarks hierachy
      childrens:[]
		},

		//api for get and put bookmark hierachy
    url:function(){
       return 'api/bookmark'
    },

		//add folder to the existing hierachy
    addfolder:function(folder)
    {
        if(!this.hasfolder(folder))
        {
           var childrens=this.getall();
           childrens.push({name:folder,id:Math.floor(Date.now() / 1000),childrens:[],type:'folder'});
           this.setall(childrens);
           return true;
        }
        return false;
    },

		//checks whether folder already exist
    hasfolder:function(folder,isreturnindex)
    {
        var childrens=this.getall();
        for(var i in childrens)
        {
          if(childrens[i].type=="folder" && childrens[i].name==folder)
          {
             return isreturnindex? i : true;
          }
        }
        return false;
    },

		//get all the folders and childrens
    getall:function(){
        return _.clone(this.get('childrens'));
    },

		refreshtree:function()
		{
			this.trigger('refresh-tree');
		},

		//sets the folders hierachy
    setall:function(list)
    {
        this.set('childrens',list);
        this.trigger('change');
        this.save();
    },

		//add bookmark to the folder
    addbookmark:function(title,url,folder)
    {
       var bookmark={name:title,url:url,type:'bookmark', id:Math.floor(Date.now()/1000)};
       var childrens=this.getall();
       if(folder!='/')
       {
           var folderindex=this.hasfolder(folder,true);
					 if(!childrens[folderindex].childrens)
					 {
						 childrens[folderindex].childrens=[];
					 }
           childrens[folderindex].childrens.push(bookmark);
           this.setall(childrens);
       }
       else {
           childrens.push(bookmark);
           this.setall(childrens);
       }
    },

		//delete the folder
    deletefolder:function(id)
    {
        var childrens=this.getall();
        var index=-1;
        for(var i in childrens)
        {
            if(childrens[i].id==id)
            {
               index=i;
               break;
            }
        }

        if(index!=-1)
        {
             childrens.splice(index,1);
             this.setall(childrens);
						 this.refreshtree();
             return true;
        }
        return false;
    },

		getallfolders:function()
		{
				var folders=[];
				var childrens=this.getall();
				for(var i in childrens)
				{
						if(childrens[i].type=='folder')
						{
							folders.push(childrens[i]);
						}
				}
				return folders;
		},

		//delete the bookmark
		//handler for delete bookmark button click
		deletebookmark:function(folderid,bookmarkindex){
        var childrens=this.getall();
				for(var i in childrens)
				{
						if(childrens[i].id==folderid)
						{
							 childrens[i].childrens.splice(bookmarkindex,1);
							 break;
						}
				}
				this.setall(childrens);
				this.refreshtree();
		},

	});
	app.bookmarklist = new app.BookmarkList();
})();
