const ResponseJs = require('./main')

const app = new ResponseJs()

app.static('/public')
app.get('/', (req, res) => {
  const name = req.body['name']
  res.headers['Content-Type'] = 'text/plain'
  res.write(`Hello ${name}, from ResponseJs.`)
})
app.listen(3100)
