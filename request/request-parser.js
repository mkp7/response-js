const parseReqLine = require('./request-line-parser')
const parseHeader = require('./header-parser')
// const parseBody = require('./body-parser')

function Request (requestLine, headers, body) {
  this.requestLine = requestLine
  this.headers = headers
  this.body = body
}

function parseRequest (str) {
  // try to parse request-line
  let parse = parseReqLine(str)
  if (parse === null) {
    return null
  }
  let [requestLine, rstr] = parse

  // try to parse headers
  parse = parseHeader(rstr)
  if (parse === null) {
    return null
  }
  let headers
  [headers, rstr] = parse

  //   // try to parse body
  //   parse = parseBody(rstr)
  //   if (parse === null) {
  //     return null
  //   }
  //   let body
  //   [body, rstr] = parse

  const request = new Request(requestLine, headers, '')

  return [request, rstr]
}

module.exports = parseRequest
