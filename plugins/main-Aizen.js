let handler = async (m, { conn}) => {
let user = global.db.data.users[m.sender]
let name = conn.getName(m.sender)
let username = conn.getName(who)
let av = `./src/mp3/${pickRandom(["aizen"])}.mp3`

m.reply( `يا ${username} ايزن هو عمي 🫡🤍`)
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
} 

handler.customPrefix = /^(عمك|صوفيا مين عمك)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
