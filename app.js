const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

const port = process.env.PORT || 3001
let connects = []

app.use(express.static('public'))

app.ws('/ws', (ws, req) => {
  connects.push(ws)
  let data
  try{
    data=JSON.parse(message)
  }catch(err){
    console.error('Invalid JSON',message)
    return
  }

  ws.on('message', (message) => {
    console.log('Received:', message)

    const weather=['晴れ','曇り','雨','雪','雷','強風']
    const w=weather[Math.floor(Math.random()*weather.length)]
    const ww={
      id:data.id,text:`${message}の天気は${w}です`
    }
    const r=JSON.stringify(ww)
    connects.forEach((socket) => {
      if (socket.readyState === 1) {
        // Check if the connection is open
        socket.send(r)
      }
    })
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})