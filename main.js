const net = require('net')
const parseRequestLine = require('./request-line-parser')

const server = net.createServer()

const clientOnConnection = c => {
  console.log(`${c.remoteAddress} connected`)

  let data = ''
  const clientOnData = (b) => {
    c.write(b.toString('utf8'))
    data += b
    process.stdout.write(data)

    const rl = parseRequestLine(data)
    if (rl !== null) {
      data = rl[1]
      console.log(rl[0])
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
