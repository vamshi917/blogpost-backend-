const mongoose = require("mongoose")
const MONGO_URI = 
"mongodb+srv://vamshieppakayala917:blogPost@cluster0.p9ynw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
const connectDb = async ()=>{
    const connection = await mongoose.connect(MONGO_URI);
if(connection) console.log("Database connected");
    else console.log("Database conection failed");
};

module.exports = { connectDb }