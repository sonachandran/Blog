const mongoose=require('mongoose')
const User = require('./User')
const blogscheme=new mongoose.Schema({

     title:{
        type:String,
        required:true

    },
     description:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    userid:{
        type:mongoose.Types.ObjectId,
        ref:User
    } 
   
})

let Userblog=mongoose.model('blog',blogscheme)

module.exports=Userblog