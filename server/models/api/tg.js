const { Telegraf } = require("telegraf")
const { message } = require('telegraf/filters')
let gigachatModel = require('./index')

class TgbotService {
    bot = ""
    async tgbotInit () {
        this.bot = new Telegraf(process.env.TG_TOKEN);
        this.bot.launch()
        console.log("Tgbot has been launched");

        this.bot.command('giga', async (ctx) => {
            console.log('ctx: ', ctx.payload)
            let userMessage = ctx.payload
            let gigaAnswer = await gigachatModel.getMessage(userMessage)
            ctx.reply(gigaAnswer.content)
        })
        // this.bot.hears('giga', (ctx) => ctx.reply('Hey there'))
    }

    async sendDataToTg (text) {
        await this.tgbotInit()
        let result = await this.bot.telegram.sendMessage(process.env.TG_CHATID, body)
        console.log("result sendDataToTg: ", result);
    }

}

module.exports = new TgbotService();