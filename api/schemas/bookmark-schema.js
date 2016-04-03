var mongoose = require('mongoose');

var schema = mongoose.Schema({name:String,childrens:Array,id:Number});

module.exports=schema;
