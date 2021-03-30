const express = require('express')
const config = require('config')
const roteador = require('./routes/fornecedores')
const NotFound = require('./errors/NotFound')
const CampoInvalido = require('./errors/CampoInvalido')
const DadosNaoFornecidos = require('./errors/DadosNaoFornecidos')
const ValorNaoSuportado = require('./errors/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

const app = express()

app.use(express.json())

app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)

    proximo()
})

app.use('/api/fornecedores', roteador)

app.use((erro, req, res, proximo) => {
    let status = 500

    if(erro instanceof NotFound) status = 404 

    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) status = 400

    if(erro instanceof ValorNaoSuportado) status = 406

    res.status(status)

    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.port'), () => console.log('API rodando!'))