const mongoose = require("mongoose")
const {Schema} = mongoose;

const notebookSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    notebookTitle:{
        type:String,
        require:true
    },
    notebookCover:{
        type:String,
    },
    bookmark: {
        type:Boolean,
        default:false
    }
})

const user = mongoose.model("notebook",notebookSchema)
module.exports = user;