const parseReqLine = require('./request-line-parser')
const parseHeader = require('./header-parser')
const parseBody = require('./body-parser')

function Request (requestLine, headers, body) {
  this.requestLine = requestLine
  this.headers = headers
  this.body = body
}

function parseRequest (buf) {
  // try to parse request-line
  let parse = parseReqLine(buf)
  if (parse === null) {
    return null
  }
  let requestLine
  [requestLine, buf] = parse

  // try to parse headers
  parse = parseHeader(buf)
  if (parse === null) {
    return null
  }
  let headers
  [headers, buf] = parse

  // try to parse body
  parse = parseBody(buf, headers)
  if (parse === null) {
    return null
  }
  let body
  [body, buf] = parse

  const request = new Request(requestLine, headers, body)

  return [request, buf]
}

module.exports = parseRequest
