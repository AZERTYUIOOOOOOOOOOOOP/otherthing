//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '✳️ tag the user'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '❅ أدخل مقدار *الجواهر* تريد أن تضيف'
    if (isNaN(txt)) throw '🔢 ارقام فقط 🔢'
    let dmt = parseInt(txt)
    let diamond = dmt
    
    if (diamond < 1) throw '❅ الحد الادنى  *1*'
    let users = global.db.data.users
   users[who].diamond += dmt

    await m.reply(`≡ *تم ✔*
───────✧ه⇩ه✧───────
❅ *المجموع:* ${dmt}
───────✧ه⇧ه✧───────`)
   conn.fakeReply(m.chat, `❅ لقد استلمت \n\n *+${dmt}* جوهره`, who, m.text)
}

handler.help = ['adddi <@user>']
handler.tags = ['econ']
handler.command = ['ضيف_جواهر'] 
handler.rowner = true

export default handler

