const mongoose=require('mongoose')
const connectDB = async()=>
{
    try{
        await mongoose.connect(process.env.MONDB_URL+"/StremoUsers");
        console.log(`MongoDb server connected ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`MongoDb server not connected ${error}`)
    }
}
module.exports = connectDB