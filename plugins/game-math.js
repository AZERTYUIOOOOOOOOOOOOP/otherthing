let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    
    if (args.length < 1) throw `
  🧮 المستويات المتاحه : 
  
${Object.keys(modes).join(' | ')} 

_📌مثال : ${usedPrefix+command} متوسط_
`.trim()
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) throw `
  🧮 المستويات المتاحه : 
  
 ${Object.keys(modes).join(' | ')}

_📌مثال : ${usedPrefix+command} متوسط_
`.trim()
    
  let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, '⚠️ There are still unanswered questions in this chat', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        await conn.reply(m.chat, `☷ المسئله\n*${math.str}*=\n\n_الوقت:_ ${(math.time / 1000).toFixed(2)} ثانيه\n\n🎁 الجائزه : ${math.bonus} اكس بي`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.reply(m.chat, `⏳ لقد انتهى الوقت !\nالاجابة هي : *${math.result}*`, conn.math[id][0])
      delete conn.math[id]
        }, math.time)
    ]
}
handler.help = ['Maths <modes>']
handler.tags = ['game']
handler.command = ['maths', 'math', 'حساب', 'ماث'] 


let modes = {
    نوب: [-3, 3,-3, 3, '+-', 15000, 10],
  سهل: [-10, 10, -10, 10, '*/+-', 20000, 40],
  متوسط: [-40, 40, -20, 20, '*/+-', 40000, 150],
  صعب: [-100, 100, -70, 70, '*/+-', 60000, 350],
  صعبب: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  مستحيل: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  مستحيل2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler
