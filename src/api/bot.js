const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_API;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg)=>{
    if(msg.text === "testMe"){
        bot.sendMessage(msg.chat.id, "working")
    }
    
})

bot.on('polling_error',(err)=>{
    console.log(err);
})


module.exports = {bot}