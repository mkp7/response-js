function RequestLine (method, target, version) {
  this.method = method
  this.target = target
  this.version = version
}

function parseRequestLine (str) {
  const ptrn = /^([^\s]{3,9}) ([^\s]{1,5000}) (HTTP\/\d\.\d)\r\n/

  let match = ptrn.exec(str)
  if (match === null) {
    return null
  }

  return [new RequestLine(match[1], match[2], match[3]), str.slice(match[0].length)]
}

module.exports = parseRequestLine
