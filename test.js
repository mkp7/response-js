const ResponseJs = require('./main')

const app = new ResponseJs()

app.static('/static')
app.get('/', (req, res) => res.write('Hello World, from ResponseJs.'))
app.listen(3100)
