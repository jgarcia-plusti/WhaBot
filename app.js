const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');


const Netflix = addKeyword(['netflix', 'net', 'netfli', 'nesflix'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con Netflix 📱',
    ]).addAnswer([
        'Estas son las opciones que tengo para ti:',
        'Plan Básico','Tiene un costo de Q35 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q90**.',
    ]);

const Disney = addKeyword(['disney', 'dis', 'disney+', 'disneyplus', 'disney plus', 'disnei'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con Disney 📱'
    ]).addAnswer([
        'Tiene un costo de Q30 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q75**.',
    ]);

const ServicesTw = addKeyword(['prime', 'primevideo', 'prime video', 
    'paramount', 'paramount +', 'paramountplus', 'paramount plus', 
    'youtube premium', 'youtube premium', 'crunchyroll','crunchy','crunchy roll',
    'max','hbo','hbomax','hbo max', 'Deezer', 'dezer', 'deser', 'vix', 'vix+', 'vix plus', 'vixplus'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱'
    ]).addAnswer([
        'Tiene un costo de Q20 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q50**.',
    ]);


const ServicesTr = addKeyword(['spotify', 'spoti', 'spoty', 'spotifai', 'spotyfai', 'spotyfy', 'spotyfy', 'spotyfay', 'spotyfay',
    'youtube music', 'youtubemusic', 'youtubemusik', 'youtubemusica', 'youtubemusica', 'youtubemusik', 'youtubemusik'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱'
    ]).addAnswer([
        'Tiene un costo de Q40 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q105**.',
    ]);

const IpTv = addKeyword(['Ip tv', 'iptv', 'ipt', 'ip', 'tv', 'tvip', 'tv ip', 'tv iptv'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con Ip TV 📱'
    ]).addAnswer([
        'Tiene un costo de Q40 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q105**.',
        '',
        'Super Promocion: Paga 6 meses por tan solo **Q180**.'
    ]);

const flowRenovacion = addKeyword(['renovacion', 'renovar'])
    .addAnswer([
        'Si deseas renovar tu plan actual, solo tienes que enviarnos tu boleta de pago con el valor de tu servicio.'
    ])
    .addAnswer([
        'Renovar el mismo',
        'Agregar un servicio'
    ]);

const Error = addKeyword(['error', 'errores', 'problema', 'problemas', 'falla', 'fallas', 'no funciona', 'no sirve', 
    'no puedo', 'no puedo ingresar', 'no puedo acceder', 'no puedo ver'])
    .addAnswer([
        '🚨 ¡Lo siento! Parece que tienes un problema con tu servicio 🚨',
        '',
        'Por favor, indícame cuál es el problema que tienes para poder ayudarte. 🤖',
    ]);

const NewService = addKeyword(['servicio nuevo', 'nuevo servicio', 'agregar servicio', 'servicio adicional', 'servicio extra', 'nuevo'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱',
        '',
        '¿Qué servicio deseas agregar a tu plan actual? 🤖',
    ]);

const flowPrincipal = addKeyword(['hola', 'ola', 'buenas tardes', 'buenos dias', 'buenas noches', 'buenas'])
    .addAnswer([
        '👋 Hola, te saluda LyJ tu asistente virtual! 🎉',
        '',
        '¿En qué puedo asistirte hoy? 🤖',
    ]).addAnswer([
        'Renovación',
        'Servicio Nuevo',
        'Soporte Tecnico',
        ''
    ], null, null, [flowRenovacion, Netflix, Disney, ServicesTw, IpTv, ServicesTr]);

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, Error, NewService]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();