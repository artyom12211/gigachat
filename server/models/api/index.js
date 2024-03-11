const GigaChat = require('gigachat-node').GigaChat;
require('dotenv').config()

class Gigachat {
    client = ""
    async createToken() {
        console.log(process.env.GIGACHAT_CLIENT_SECRET)
        const client = new GigaChat(process.env.GIGACHAT_CLIENT_SECRET, process.env.GIGACHAT_CLIENT_ID_BASE64);
        await client.createToken();
        this.client = client
    }
    async getModels() {
        const response = await (this.client).allModels();
        // const response = await this.client.model('GigaChat:latest');
        return response
    }
    async getMessage(userMessage) {
        const response = await this.client.completion({
            "model":"GigaChat:latest",
            "messages": [
                {
                    role:"user",
                    content:userMessage
                }
            ]
        });
        let gigaAnswer = response.choices[0].message
        console.log("gigaAnswer: ", response.choices[0].message);
        return gigaAnswer
    }
}

module.exports = new Gigachat()