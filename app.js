const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const Catalogs = addKeyword(['catalogo', 'catalogos', 'catalogo de servicios', 'catalogo de servicio', 
    'catalogo de productos', 'catalogo de producto', 'catalogo de planes', 'catalogo de plan', 'Productos', 'productos', 'servicios', 'servicio'])
    .addAnswer([
        'Estos son los servicios que tenemos disponibles para ti:',
        '1. Netflix',
        '2. Disney+',
        '3. Prime Video',
        '4. HBO Max',
        '5. Spotify',
        '6. YouTube Premium',
        '7. Crunchyroll',
        '8. Paramount+',
        '9. Deezer',
        '10. Vix',
        '',
        '¿En qué más puedo ayudarte? 🤖',
    ]);

const Payment = addKeyword(['pago', 'pagar', 'pagos', 'paguar', 'paga', 'pago de servicio', 'pagar servicio', 'pagos de servicio', 'paguar servicio', 'paga servicio'])
    .addAnswer([
        'Muchas gracias por confiar en nuestro servicio',
        '',
        'Para obtener tu suscripción, por favor realiza el pago de tu servicio.',
        'Envianos una foto de tu boleta de pago para poder activar el servicio.',
        'a los numero de cuenta:',
        '1. Ahorro - Banrural - 04103000336503 - Angel García',
        '2. Ahorro - B. Industrial - 1229311 - Angel García',
    ], null, null, [Catalogs]);

const Accounts = addKeyword(['cuentas', 'cuenta', 'numero de cuenta', 'numero de cuentas', 'cuentas bancarias', 'cuenta bancaria', 'cuentas de banco', 'cuenta de banco'])
    .addAnswer([
        'Contamos con cuentas en Banrural y Banco Industrial',
        'Estamos trabajando para agregar mas bancos a nuestra lista de pagos',
    ], null, null, [Payment, Catalogs]);

const Bancs = addKeyword(['banco', 'bancos', 'que bancos', 'que banco', 'banco aceptado', 'banco aceptados', 'banco acepta', 'banco aceptan'])
    .addAnswer([
        'Por el momento aceptamos pagos en Banrural y Banco Industrial',
        'pronto agreagaremos mas bancos a nuestra lista de pagos',
    ], null, null, [Payment, Accounts, Catalogs]);

const Netflix = addKeyword(['netflix', 'net', 'netfli', 'nesflix'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con Netflix 📱',
    ]).addAnswer([
        'Estas son las opciones que tengo para ti:',
        'Plan Básico','Tiene un costo de Q35 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q90**.',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const Disney = addKeyword(['disney', 'disney+', 'disneyplus', 'disney plus', 'disnei'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con Disney 📱'
    ]).addAnswer([
        'Tiene un costo de Q30 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q75**.',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const ServicesTw = addKeyword(['prime', 'primevideo', 'prime video', 
    'paramount', 'paramount +', 'paramountplus', 'paramount plus', 
    'youtube premium', 'youtube premium', 'youtube', 'yutube', 'yotube', 'crunchyroll','crunchy','crunchy roll',
    'max','hbo','hbomax','hbo max', 'Deezer', 'dezer', 'deser', 'vix', 'vix+', 'vix plus', 'vixplus'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱'
    ]).addAnswer([
        'Tiene un costo de Q20 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q50**.',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const ServicesTr = addKeyword(['spotify', 'spoti', 'spoty', 'spotifai', 'spotyfai', 'spotyfy', 'spotyfy', 'spotyfay', 'spotyfay',])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱'
    ]).addAnswer([
        'Tiene un costo de Q40 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q105**.',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const NewService = addKeyword(['servicio nuevo', 'nuevo servicio', 'agregar servicio', 'servicio adicional', 'servicio extra', 'nuevo'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱',
        '',
        '¿Qué servicio deseas agregar a tu plan actual? 🤖',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const flowRenovacion = addKeyword(['renovacion', 'renovar'])
    .addAnswer([
        'Si deseas renovar tu plan actual, solo tienes que enviarnos tu boleta de pago con el valor de tu servicio.'
    ])
    .addAnswer([
        'Renovar el mismo',
        'Agregar un servicio'
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const Error = addKeyword(['error', 'errores', 'problema', 'problemas', 'falla', 'fallas', 'no funciona', 'no sirve', 
    'no puedo', 'no puedo ingresar', 'no puedo acceder', 'no puedo ver'])
    .addAnswer([
        '🚨 ¡Lo siento! Parece que tienes un problema con tu servicio 🚨',
        '',
        'Por favor, indícame cuál es el problema que tienes para poder ayudarte. 🤖',
    ]);

const Adquirir = addKeyword(['adquirir', 'comprar', 'compra', 'adquirir servicio', 'comprar servicio', 'compra servicio', 
    'adquirir un servicio', 'comprar un servicio', 'compra un servicio', 'quiero adquirir', 'quiero comprar', 'quiero compra'])
    .addAnswer([
        '¡Claro! Te puedo ayudar 📱',
        '',
        '¿Qué servicio deseas adquirir? 🤖',
    ], null, null, [Payment, Accounts, Bancs, Catalogs]);

const flowPrincipal = addKeyword(['hola', 'ola', 'buenas tardes', 'buenos dias', 'buenas noches', 'buenas', 'hi', 'hello'])
    .addAnswer([
        '👋 Hola, te saluda LyJ tu asistente virtual! 🎉',
        '',
        '¿En qué puedo asistirte hoy? 🤖',
    ]).addAnswer([
        'Renovación',
        'Servicio Nuevo',
        'Soporte Tecnico',
        ''
    ], null, null, [Catalogs, Adquirir, Error, NewService, flowRenovacion, Netflix, Disney, ServicesTw, IpTv, ServicesTr, Payment, Accounts, Bancs]);

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, Payment, Accounts, Bancs]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();