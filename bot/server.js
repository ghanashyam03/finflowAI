const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const TelegramBot = require("node-telegram-bot-api");
const fileProcessor = require("./textExtractor");
const extractTextFromImage = require("./textExtractor");
const writeToFile = require("./textFile/filleWritter");


const token = process.env.T_TOKEN;
let shouldRespond = false;
const bot = new TelegramBot(token, { polling: true });
setTimeout(() => {
    shouldRespond = false;
    console.log("myVariable has been set to false.");
}, 8000);
        
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const userId = msg.from.id;
    const firstName = msg.from.first_name;


    bot.sendMessage(
      chatId,
      `Hello, ${firstName}! Welcome to your bot.
      your options:
      /financialassisatnce
      /budgetTracker
      `
    );
    shouldRespond = true;
  });

 
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
      
        if (shouldRespond===true) {
           const data=msg.text
          const response = 'hello';
          bot.sendMessage(chatId, response);
        } else {
            const response=`Ignoring message before /start:', msg`
          bot.sendMessage(chatId,response);
        }
      });





bot.onText(/\/financialassisatnce/, (msg) => {
    if(shouldRespond===true){
        const chatId = msg.chat.id;
        console.log(msg.text);
        const response =
          `Ask anything regarding to financial subjects.
            Must use text to communicate....
            go back /start`;
            bot.sendMessage(chatId,response)
    }else{
        console.log('Ignoring message before /start:', msg);
    }

});

bot.onText(/\/budgetTracker/,(msg)=>{
    if(shouldRespond===true){
        const chatId = msg.chat.id;
        console.log(msg.text);
        const response =
          `For input /document
            go back /start`;
        bot.sendMessage(chatId,response);
    }else{
        console.log('Ignoring message before /start:', msg);
    }
})
bot.onText(/\/document/,(msg)=>{
    if(shouldRespond===true){
        const chatId = msg.chat.id;
        const response=`must send a your bills as document`
        bot.sendMessage(chatId,response)
        bot.on("document", (msg) => {
            const chatId = msg.chat.id;
            const document = msg.document;
            // Download the document
            bot
              .downloadFile(document.file_id, "./downloads")
              .then((filePath) => {
                console.log("Document downloaded:", filePath);
          
                bot.sendMessage(chatId, "Document received and processed successfully!");
                if (msg.document) {
                  try {
                    extractTextFromImage(filePath).then((text) => {
                      console.log("extracted text" + text);
                      writeToFile(text, "../bot/textFile/extratcedData.txt").then(
                        (res) => {
                          console.log("file result" + res);
                        }
                      );
                    });
                  } catch (error) {
                    console.log("error in file path" + error);
                  }
                }
              })
              .catch((error) => {
                console.error("Error downloading document:", error.message);
                bot.sendMessage(
                  chatId,
                  "Error processing the document. Please try again."
                );
              });
          });
          
    }
})

app.listen(5000);
