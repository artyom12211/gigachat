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
            let chatId = ctx.update.message.chat.id
            let userId = ctx.update.message.from.id
            // Launching gpt bot only in our chat or with admin private chat.
            if (chatId == process.env.TG_CHAT_ID || userId == process.env.TG_ADMIN_ID) {
                let userMessage = ctx.payload
                let model = 'GigaChat:latest'
                let gigaAnswer = await gigachatModel.getMessage(userMessage, model)
                ctx.reply(gigaAnswer.content)
            }
        })
        this.bot.command('gpt', async (ctx) => {
            let chatId = ctx.update.message.chat.id
            let userId = ctx.update.message.from.id
            // Launching gpt bot only in our chat or with admin private chat.
            if (chatId == process.env.TG_CHAT_ID || userId == process.env.TG_ADMIN_ID) {
                let userMessage = ctx.payload
                let model = 'gpt-3.5-turbo'
                let gigaAnswer = await gigachatModel.getMessage(userMessage, model)
                ctx.reply(gigaAnswer.content)
            }
        })
    }
}

module.exports = new TgbotService();