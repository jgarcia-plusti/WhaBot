const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const { EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const OpenAI = require("openai");

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY
});

const initialPrompt = "Eres un asistente virtual que ayuda a los clientes a elegir la plataforma de streaming que mejor se adapta a sus necesidades. " +
                      "Las plataformas disponibles son: Netflix Q.35, Disney Q.35, Prime Q.30, HBO Q.25, Spotify Q.40, YouTube Q.25, Crunchyroll Q.25, Paramount Q.25, Deezer Q.25. " +
                      "Tu objetivo es ofrecer respuestas cortas, claras y convincentes, explicando brevemente los beneficios de cada plataforma. " +
                      "Además, debes informarles que el pago se realiza mediante transferencia o depósito a las cuentas: 04103000336503 (Banrural) o 1229311 (Banco Industrial). " +
                      "Una vez que el cliente envíe el comprobante de pago, la activación de la cuenta es inmediata. " +
                      "Cada cuenta solo puede usarse en un dispositivo a la vez (tablet, televisión, celular). " +
                      "Si el cliente tiene algún problema, debes indicarle que un agente lo atenderá pronto. " +
                      "Usa un tono amigable y cercano, como si estuvieras hablando directamente con el cliente. " +
                      "Evita respuestas demasiado estructuradas o que parezcan un listado. En su lugar, sé natural y conversacional.";

msg = [{ role: "user", content: initialPrompt }];
const fn =  async() =>{
    response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: msg
    });
}


const REGEX = /.*/;
const IaFlow = addKeyword([REGEX], { regex: true })
.addAction({ capture: true }, async (ctx, { flowDynamic }) => {
    const msgUser = ctx.body;
    console.log(ctx.body);
    msg= [{ role: "user", content: initialPrompt + msgUser }];
    
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