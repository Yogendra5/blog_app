const mongoose= require('mongoose')
const User = require('./User')
const moment= require('moment')
const blogschema =new mongoose.Schema({
    category:{
        type:String,
        required:true,
        default:'Custom'
    },
    name:{ 
        type:String,
        maxsize:[100,`only 100 char's allowed`],
        trim:true,
    },
    descriptioninshort:{
        type:String,
        trim:true,
        maxsize:[1000,`only 1000 char's allowed`],
    },
    description:{
        type:String,
        trim:true,
    },
    // userid:{
    //     type:mongoose.Schema.Types.ObjectId, ref:'User',
    // } 
    writer:{
        type:String,
        required:true,
    },
    writerid:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        default:new Date().toLocaleDateString(),
        required:true,
    }
    // image:{
    //     type:String,
    // }
})
const schema= mongoose.model('schema',blogschema) 

// module.exports=mongoose.model('schema',schema)

// async function getuserid(){
//     const userid=await schema.find().populate('userid')
    // console.log(userid);
// }

// getuserid() 

module.exports=schema 