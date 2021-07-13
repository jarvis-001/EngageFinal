const mongoose = require("mongoose");

var roomSchema = mongoose.Schema({
    mid:String,
    mpass:String,
    mname:String,
})

module.exports = mongoose.model("Room", roomSchema)