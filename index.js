// loads env files contents into process.env by default
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require('./Route/route')
require('./DB/connections')

const pfServer=express()

pfServer.use(cors())
// application specific middleware
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 4000

pfServer.listen(PORT,()=>{
    console.log(`pf-server started running at PORT:${PORT} & waiting for client request`);
    
})

pfServer.get('/',(req,res)=>{
    res.send("Project fair application started running & waiting for client request")
})