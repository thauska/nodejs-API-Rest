const express = require('express')
const config = require('config')
const roteador = require('./routes/fornecedores')
const NotFound = require('./errors/NotFound')
const CampoInvalido = require('./errors/CampoInvalido')
const DadosNaoFornecidos = require('./errors/DadosNaoFornecidos')
const ValorNaoSuportado = require('./errors/ValorNaoSuportado')

const app = express()

app.use(express.json())

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