class NotFound extends Error {
    constructor(nome) {
        super(`${nome} não foi encontrado`)
        this.name = 'NotFound'
        this.idErro = 0
    }
}

module.exports = NotFound