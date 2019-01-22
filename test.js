const ResponseJs = require('./main')

const app = new ResponseJs()

app.static('/public')
app.get('/', (req, res) => {
  res.headers['Content-Type'] = 'text/plain'
  res.write('Hello World, from ResponseJs.')
})
app.listen(3100)
