const formDataParser = require('./form-data-parser')

const bodyParsers = {
  'application/json': JSON.parse,
  'multipart/form-data': formDataParser
}

function parseBody (buf, headers) {
  const str = buf.toString('utf8')

  if (headers['content-length'] === undefined) {
    return [null, str]
  }

  const sz = parseInt(headers['content-length'])
  if (sz > str.length) {
    return null
  }

  const parser = bodyParsers[headers['content-type']]
  if (parser !== undefined) {
    return [parser(str.slice(0, sz)), Buffer.from(str.slice(sz))]
  }

  if (headers['content-type'].startsWith('multipart/form-data')) {
    return [bodyParsers['multipart/form-data'](str.slice(0, sz)), Buffer.from(str.slice(sz))]
  }

  return [str.slice(0, sz), Buffer.from(str.slice(sz))]
}

module.exports = parseBody
