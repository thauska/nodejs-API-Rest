class NotFound extends Error {
    constructor() {
        super('Fornecedor não foi encontrado')
        this.name = 'NotFound'
        this.idErro = 0
    }
}

module.exports = NotFound