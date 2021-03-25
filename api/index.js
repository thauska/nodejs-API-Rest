const express = require('express')
const config = require('config')
const roteador = require('./routes/fornecedores')

const app = express()

app.use(express.json())

app.use('/api/fornecedores', roteador)

app.listen(config.get('api.port'), () => console.log('API rodando!'))