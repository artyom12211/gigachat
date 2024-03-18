let gigachatModel = require('./models/api/index') 
let tgModel = require('./models/api/tg') 

const express = require('express')
require('dotenv').config()

const app = express();

gigachatModel.createToken()

let initTg = async () => {
    await tgModel.tgbotInit()
}


initTg()

const PORT = process.env.PORT || 3500;
app.listen(PORT);