const ResponseJs = require('./main')

const app = new ResponseJs()

app.static('/public')

app.get('/', (req, res) => {
  res.headers['Content-Type'] = 'text/plain'

  return res.write('Hello World, from ResponseJs.')
})
app.get('/some', (req, res) => {
  res.headers['Content-Type'] = 'text/plain'

  return res.write('Hello World, from ResponseJs.')
})

app.post('/form-data', (req, res) => {
  res.headers['Content-Type'] = req.body[0]['content-type'] || 'text/plain'

  return res.write(req.body[0]['body'])
})

app.listen(3100)
