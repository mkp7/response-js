const net = require('net')
const parseRequest = require('./request/request-parser')
const getResponse = require('./response/get-response')

function ResponseJs () {
  // array of request handlers for each method
  this.routes = {
    STATIC: '/static',
    GET: [],
    POST: [],
    PUT: [],
    DELETE: []
    // head
    // options
  }

  this.static = dir => (this.routes.STATIC = dir)
  // register handlers for each routes
  this.get = (...rc) => this.routes.GET.push(rc)
  this.post = (...rc) => this.routes.POST.push(rc)
  this.put = (...rc) => this.routes.PUT.push(rc)
  this.delete = (...rc) => this.routes.DELETE.push(rc)

  this.listen = port => {
    const server = net.createServer()

    server.on('connection', conn => {
      console.log(`${conn.remoteAddress} connected`)

      let data = Buffer.from('')
      conn.on('data', b => {
        data = Buffer.concat([data, b])

        const rl = parseRequest(data)
        if (rl !== null) {
          data = rl[1]
          getResponse(conn, rl[0], this.routes)
        }
      })
      conn.on('close', () => {
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
