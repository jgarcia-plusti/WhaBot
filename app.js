const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const { EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const OpenAI = require("openai");

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY // Asegúrate de que la API key se obtiene de las variables de entorno
});

const initialPromt = "Eres un asistente virtual para ayudar a mis clientes a saber que plataforma de streaming les conviene, Dales respuestas cortas y consisas " +
                        "las plataformas son: Netflix Q.35,Disney Q.35,Prime Q.30,HBO Q.25,Spotify Q.40,YouTube Q.25,Crunchyroll Q.25,Paramount Q.25,Deezer Q.25 " + 
                        "el numero de cuenta es 04103000336503 Banrural y 1229311 Banco Industrial " +
                        "Convence a los clientes de que compren cualuqiera de las plataformas de streaming "+
                        "Responde corto y consiso";

msg = [{ role: "user", content: initialPromt }];
const fn =  async() =>{
    response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: msg
    });
}

fn();
const REGEX = /.*/;
const IaFlow = addKeyword(REGEX, { regex: true })
.addAction({ capture: true }, async (ctx, { flowDynamic }) => {
    const msgUser = ctx.body;
    console.log(ctx.body);
    msg.push({ role: "user", content: msgUser });
    
    response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: msg
    });

    return await flowDynamic(response.choices[0].message.content);
});

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([IaFlow]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();