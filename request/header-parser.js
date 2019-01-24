// function Headers () {
//   this.headers = {}
//   this.addField = (field, value) => {
//     this.headers[field] = value
//   }
// }

function parseHeader (buf) {
  const ptrn = /^(.+?): ?(.+) ?\r\n/
  const end = /^\r\n/

  let i = 0
  while (Buffer.byteLength(buf) > 1 &&
    i < Buffer.byteLength(buf) &&
    !(buf[i++] === 13 && buf[i] === 10)) {}

  if (i === Buffer.byteLength(buf)) {
    return null
  }

  const str = buf.slice(0, ++i).toString('ascii')

  if (end.exec(str) !== null) {
    return [{}, buf.slice(2)]
  }

  let match = ptrn.exec(str)
  if (match === null) {
    return null // should be invalid header-field
  }

  const data = parseHeader(buf.slice(i))
  if (data === null) {
    return null
  }

  data[0][match[1].toLowerCase()] = match[2]

  return data
}

module.exports = parseHeader
