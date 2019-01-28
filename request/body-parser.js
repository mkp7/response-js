const formDataParser = require('./form-data-parser')

const bodyParsers = {
  'application/json': JSON.parse,
  'multipart/form-data': formDataParser
}

function parseBody (buf, headers) {
  // const str = buf.toString('utf8')

  if (headers['content-length'] === undefined) { // unsafe
    return [null, Buffer.from('')]
  }

  const sz = parseInt(headers['content-length'])
  if (sz > Buffer.byteLength(buf)) {
    return null // invalid request
  }

  // form-data exclusive
  if (headers['content-type'].startsWith('multipart/form-data')) {
    const body = bodyParsers['multipart/form-data'](buf.slice(0, sz), headers['content-type'])

    if (body === null || Buffer.byteLength(body[1]) !== 0) {
      return null // invalid request
    }

    return [body[0], buf.slice(sz)]
  }

  const parser = bodyParsers[headers['content-type']]
  if (parser !== undefined) {
    // default uft8
    return [parser(buf.slice(0, sz).toString('utf8')), buf.slice(sz)]
  }

  // default utf8
  return [buf.slice(0, sz).toString('utf8'), buf.slice(sz)]
}

module.exports = parseBody
