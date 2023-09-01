
const mongoose = require("mongoose")

const Tasks = new mongoose.Schema({
    task:{
        type:String,
        required:[true,"Task must be provided"]
    },
    complated:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    uptadedAt:{
        type:Date,
    }
})

module.exports = mongoose.model("Tasks",Tasks)