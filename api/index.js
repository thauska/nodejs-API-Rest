const express = require('express')
const config = require('config')

const app = express()

const roteador = require('./routes/fornecedores')
app.use(express.json())

app.use('/api/fornecedores', roteador)

app.listen(config.get('api.port'), () => console.log('API rodando!'))