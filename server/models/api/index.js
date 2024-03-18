const GigaChat = require('gigachat-node').GigaChat;
const OpenAI = require('openai');
require('dotenv').config()

class Gigachat {
    gigaChat = ""
    openai = ""
    async createToken() {
        // GIGA
        const gigaChat = new GigaChat(process.env.GIGACHAT_CLIENT_ID_BASE64);
        await gigaChat.createToken();
        this.gigaChat = gigaChat
        // OPENAI
        const openai = new OpenAI({
            baseURL: "https://api.vsegpt.ru/v1",
            apiKey: process.env['VSTGPT_API_KEY'], // This is the default and can be omitted
        });
        this.openai = openai
    }

    async getMessage(userMessage, model) {
        let chatCompletion
        if (model == "GigaChat:latest") {
            chatCompletion = await this.gigaChat.completion({
                model:model,
                messages: [{role:"user",content:userMessage}]
            });
        }
        else if (model == "gpt-3.5-turbo") {
            chatCompletion = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: userMessage }],
                model: 'gpt-3.5-turbo',
            });
        }
        let assistantAnswer = chatCompletion.choices[0].message
        console.log(`${model}: ${assistantAnswer}`);
        return assistantAnswer
    }
}

module.exports = new Gigachat()