const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const Netflix = addKeyword(['netflix', 'net', 'netfli'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱',
    ]).addAnswer([
        'Estas son las opciones que tengo para ti:',
        'Plan Básico','Tiene un costo de Q35 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q90**.',
    ])

const Disney = addKeyword(['disney', 'dis', 'disney+'])
    .addAnswer([
        '🎉 ¡Claro! Te puedo ayudar con eso 📱'
    ]).addAnswer([
        'Tiene un costo de Q30 mensuales para un perfil individual.',
        '',
        'Promoción especial: Paga 3 meses por tan solo **Q75**.',
    ])

const flowRenovacion = addKeyword(['renovacion', 'renovar', 'actualizar'])
    .addAnswer([
        'Si deseas renovar tu plan actual, solo tienes que enviarnos tu boleta de pago con el valor de tu servicio.'
    ])
    .addAnswer([
        'Renovar el mismo',
        'Agregar un servicio'
    ])

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer([
        '👋 Hola, te saluda LyJ tu asistente virtual! 🎉',
        '',
        '¿En qué puedo asistirte hoy? 🤖',
    ]).addAnswer([
        'Renovación',
        'Servicio Nuevo',
        'Soporte Tecnico',
        ''
    ], null, null, [flowRenovacion, Netflix, Disney])


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, Netflix, Disney])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
