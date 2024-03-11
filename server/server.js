let gigachatModel = require('./models/api/index') 
let tgModel = require('./models/api/tg') 

const express = require('express')
require('dotenv').config()

const app = express();

// Авторизованные данные Client_id
// NzNlMzU5NzctNmY5OS00NDdlLWE2ZWEtODAwOGRkNThmNDFjOjE4OTVhNjMyLTMxZTgtNGIzMy04MGI3LTJmMTQzYzkwNWQ2Ng


gigachatModel.createToken()

let initGigachat = async () => {
    await gigachatModel.createToken()
    let models = await gigachatModel.getMessage()
    console.log('models: ', models)
}

let initTg = async () => {
    await tgModel.tgbotInit()
}

// initGigachat()
initTg()

const PORT = process.env.PORT || 3500;
app.listen(PORT);