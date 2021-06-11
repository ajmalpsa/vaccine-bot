process.env.NTBA_FIX_319 = 1;
const { sendMessageAction } = require("./src/actions/sendMessage");
const cron = require("node-cron");
const express = require("express");
const { bot } = require("./src/api/bot");
const app = express();

let port = process.env.PORT || 3000 ;
app.get("/",(req, res)=>{
    res.send("bot is working...");
})
//bot.sendMessage("374255531", "hello");
cron.schedule('* */5 * * * *',()=>{
sendMessageAction();

});





app.listen(port,'0.0.0.0', ()=>{
    console.log("listening to port :"+port);
})


