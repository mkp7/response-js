const bodyParsers = {
  'application/json': JSON.parse
}

function parseBody (str, headers) {
  if (headers['content-length'] === undefined) {
    return [null, str]
  }

  const sz = parseInt(headers['content-length'])
  if (sz > str.length) {
    return null
  }

  const parser = bodyParsers[headers['content-type']]
  if (parser !== undefined) {
    return [parser(str.slice(0, sz)), str.slice(sz)]
  }

  return [str.slice(0, sz), str.slice(sz)]
}

module.exports = parseBody
