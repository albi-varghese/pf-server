const mongoose =require('mongoose')

const connectionString=process.env.connection_string

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas connected successfully to Pf-Server");
    
}).catch((err)=>{
    console.log("MongoDB connection failed",err);
    
})