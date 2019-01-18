const PUBLIC = './public'
const fs = require('fs')

function Response (statusLine, headers, body) {
  this.statusLine = statusLine
  this.headers = headers
  this.body = body
  this.stringify = () => {
    let res = this.statusLine + '\r\n'
    for (let [k, v] of Object.entries(this.headers)) {
      res += `${k}:${v}\r\n`
    }
    res += `\r\n${body}\r\n`

    return res
  }
}

function getUnderDevelopmentResponse () {
  const statusLine = 'HTTP/1.1 501 Not Implemented'
  const body = fs.readFileSync(`${PUBLIC}/under-dev.html`, 'utf8')
  const headers = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(body)
  }

  return new Response(statusLine, headers, body)
}

function getResponse (request) {
  if (request.requestLine.method !== 'GET') {
    return getUnderDevelopmentResponse()
  }

  const files = fs.readdirSync(PUBLIC)
  if (!files.some(f => f === request.requestLine.target.slice(1))) {
    return getUnderDevelopmentResponse()
  }

  const statusLine = 'HTTP/1.1 200 OK'
  const body = fs.readFileSync(`${PUBLIC}${request.requestLine.target}`, 'utf8')
  const headers = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(body)
  }

  return new Response(statusLine, headers, body)
}

module.exports = getResponse
