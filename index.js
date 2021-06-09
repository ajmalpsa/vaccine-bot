process.env.NTBA_FIX_319 = 1;
const { sendMessageAction } = require("./src/actions/sendMessage");
const cron = require("node-cron");
const express = require("express");
const app = express();

let port = process.env.PORT || 3000 ;
app.get("/",(req, res)=>{
    res.send("bot is working...");
})

cron.schedule('0 0 * * * *',sendMessageAction);


app.listen(port,'0.0.0.0', ()=>{
    console.log("listening to port :"+port);
})


