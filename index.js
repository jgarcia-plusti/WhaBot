// Please install OpenAI SDK first: `npm install openai`
const OpenAI = require("openai");

const openai = new OpenAI({
    baseURL: 'https://api.aimlapi.com/v1',
    apiKey: '8760fa48a90e4f3a96d6f598681f25cd'
});

var promt = "Eres un asistente guia para los usuarios que desean adquirir plataformas "+
"de streaming. Puedes ayudar a los usuarios "+
"a renovar su plan actual, agregar un servicio nuevo o brindar soporte técnico.";

var messageUser = "Hola";

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: promt + messageUser }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0].message.content);
}

main();