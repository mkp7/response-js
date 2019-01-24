function RequestLine (method, target, version) {
  this.method = method
  this.target = target
  this.version = version
}

function parseRequestLine (buf) {
  let i = 0
  while (Buffer.byteLength(buf) > 2 && i < Buffer.byteLength(buf) && !(buf[i++] === 13 && buf[i] === 10)) {}

  if (i === Buffer.byteLength(buf)) {
    return null
  }

  const str = buf.slice(0, ++i).toString('ascii')

  const ptrn = /^([^\s]{3,9}) ([^\s]{1,5000}) (HTTP\/\d\.\d)\r\n$/

  let match = ptrn.exec(str)
  if (match === null) {
    return null // should be invalid start-line
  }

  return [new RequestLine(match[1], match[2], match[3]), buf.slice(i)]
}

module.exports = parseRequestLine
