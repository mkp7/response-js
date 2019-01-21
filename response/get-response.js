const fs = require('fs')
const url = require('url')
const getContentType = require('./content-type')

const PUBLIC_DIR = url.pathToFileURL(`${__dirname}/../public`).pathname

function Response (statusLine, headers, body) {
  this.statusLine = statusLine
  this.headers = headers
  this.body = body
  this.stringify = () => {
    let res = this.statusLine + '\r\n'
    for (let [k, v] of Object.entries(this.headers)) {
      res += `${k}:${v}\r\n`
    }

    return Buffer.concat([Buffer.from(res + '\r\n'), this.body])
  }
}

function getUnderDevelopmentResponse () {
  const statusLine = 'HTTP/1.1 501 Not Implemented'
  const body = fs.readFileSync(`${PUBLIC_DIR}/under-dev.html`)
  const headers = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(body)
  }

  return new Response(statusLine, headers, body)
}

function getNotFoundResponse () {
  const statusLine = 'HTTP/1.1 404 Not Found'
  const body = fs.readFileSync(`${PUBLIC_DIR}/not-found.html`)
  const headers = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(body)
  }

  return new Response(statusLine, headers, body)
}

function getForbiddenResponse () {
  const statusLine = 'HTTP/1.1 403 Forbidden'
  const body = fs.readFileSync(`${PUBLIC_DIR}/forbidden.html`)
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

  if (!url.pathToFileURL(`${PUBLIC_DIR}${request.requestLine.target}`)
    .pathname.startsWith(PUBLIC_DIR)) {
    return getForbiddenResponse()
  }

  try {
    const statusLine = 'HTTP/1.1 200 OK'
    const body = fs.readFileSync(`${PUBLIC_DIR}${request.requestLine.target}`)
    const headers = {
      'Content-Type': getContentType(request.requestLine.target) || 'application/octet-stream',
      'Content-Length': Buffer.byteLength(body)
    }

    return new Response(statusLine, headers, body)
  } catch (err) {
    return getNotFoundResponse()
  }
}

module.exports = getResponse
