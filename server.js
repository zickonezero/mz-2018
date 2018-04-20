const express = require('express')
const app = express()

app.get('/', (req, res) => res.render('index.html'))

// app.use(express.static(__dirname + 'src/index.html'))

app.listen(8081, () => console.log('Example app listening on port 8081!'))
