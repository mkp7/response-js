const net = require('net')
const parseRequest = require('./request/request-parser')
const getResponse = require('./response/get-response')

function ResponseJs () {
  this.STATIC = '/public' // static file serving directory
  this.static = dir => (this.STATIC = dir)

  // array of request handlers for each method
  this.GET = []
  this.POST = []
  this.PUT = []
  this.DELETE = []
  // this.head
  // this.options

  // register handlers for each routes
  this.get = (...rc) => this.GET.push(rc)
  this.post = (...rc) => this.POST.push(rc)
  this.put = (...rc) => this.PUT.push(rc)
  this.delete = (...rc) => this.DELETE.push(rc)

  this.start = port => {
    const server = net.createServer()

    server.on('connection', c => {
      console.log(`${c.remoteAddress} connected`)

      let data = ''
      c.on('data', b => {
        data += b.toString('utf8')

        const rl = parseRequest(data)
        if (rl !== null) {
          data = rl[1]
          const res = getResponse(rl[0])
          c.write(res.stringify())
        }
      })
      c.on('close', () => {
        console.log(`client disconnected`)
      })
    })

    server.on('close', c => {
      console.log(`${c.remoteAddress} disconnected`)
    })

    server.on('error', e => {
      console.log(e)
    })

    server.listen(port || 4000, 'localhost', () => {
      console.log(`Server is listening on localhost:${port || 4000}...`)
    })
  }
}

module.exports = ResponseJs
