const net = require('net')
const parseRequest = require('./request/request-parser')
const getResponse = require('./response/get-response')

const server = net.createServer()

const clientOnConnection = c => {
  console.log(`${c.remoteAddress} connected`)

  let data = ''
  const clientOnData = (b) => {
    data += b.toString('utf8')
    // process.stdout.write(data)

    const rl = parseRequest(data)
    if (rl !== null) {
      data = rl[1]
      console.log(rl[0])
      const res = getResponse(rl[0])
      c.write(res.stringify())
    }
  }

  const clientOnEnd = () => {
    console.log('data stream recieve end')
  }

  const clientOnClose = () => {
    console.log(`client disconnected`)
  }

  c.on('data', clientOnData)
  c.on('end', clientOnEnd)
  c.on('close', clientOnClose)
}

server.on('connection', clientOnConnection)

server.on('close', c => {
  console.log(`${c.remoteAddress} disconnected`)
})

server.on('error', e => {
  console.log(e)
})

server.listen(4000, 'localhost', () => {
  console.log('server listening on localhost port 4000...')
})
