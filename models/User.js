const mongoose=require('mongoose')

const userscheme=new mongoose.Schema({

   firstname:{
        type:String,
        required:true

    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        type:String,
        required:true
    }
})

let User=mongoose.model('User',userscheme)

module.exports=User