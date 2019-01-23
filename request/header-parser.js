// function Headers () {
//   this.headers = {}
//   this.addField = (field, value) => {
//     this.headers[field] = value
//   }
// }

function parseHeader (str) {
  const ptrn = /^(.+?): ?(.+) ?\r\n/
  const end = /^\r\n/

  if (end.exec(str) !== null) {
    return [{}, str.slice(2)]
  }

  let match = ptrn.exec(str)
  if (match === null) {
    return null
  }

  const data = parseHeader(str.slice(match[0].length))
  if (data === null) {
    return null
  }

  data[0][match[1].toLowerCase()] = match[2]

  return data
}

module.exports = parseHeader
