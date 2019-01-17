const PUBLIC = '../public'
const fs = require('fs')

function Response (statusLine, headers, body) {
  this.statusLine = statusLine
  this.headers = headers
  this.body = body
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

  const statusLine = 'HTTP/1.1 200 OK'
  try {
    const body = fs.readFileSync(`${PUBLIC}/under-dev.html`, 'utf8')
    const headers = {
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(body)
    }

    return new Response(statusLine, headers, body)
  } catch (err) {

  }
}
