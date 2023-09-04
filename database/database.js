require('dotenv').config();
const mongoose= require('mongoose')
const connurl=process.env.connurl

const connectdb= async()=>{
    try {
        const conn=await mongoose.connect(connurl)
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectdb