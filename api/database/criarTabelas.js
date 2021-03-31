const modelos = [
    require('../routes/fornecedores/ModeloTabelaFornecedor'),
    require('../routes/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas () {
    for(let cont = 0; cont < modelos.length; cont++) {
        const modelo = modelos[cont]
        await modelo.sync()
    }
}

criarTabelas()