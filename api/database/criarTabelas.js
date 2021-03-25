const ModeloTabela = require('../routes/fornecedores/ModeloTabelaFornecedor')

ModeloTabela.sync()
    .then(() => console.log('Tabela criada com sucesso!'))
    .catch(console.log)