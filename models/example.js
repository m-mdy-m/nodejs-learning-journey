const { Schema , default:mongoose } = require('mongoose')


const example = new Schema({
    _one:{
        type: String,
        required : true,
    },
    _two:{
        type: String,
        required : true,
    },
    _creator:{
        type : Object,
        required : String,   // یعنی این به صورت ابجکته و همه رشته هستند
        // example => creator :{ name : "MAHDI"}
    },
}, {timeseries : true})


module.exports = mongoose.model("example" , example)