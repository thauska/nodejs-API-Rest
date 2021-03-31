const roteador = require('express').Router()

roteador.get('/', (req, res) => {
    res.send(
        JSON.stringify([])
    )
})

module.exports = roteador