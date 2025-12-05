const conn = require('./db/conn') 
const { Usuario, Pedido, Produto, ItemPedido, Entrega, Estoque } = require('./models/rel') 

async function syncDataBase(){
    try{
        await conn.sync({ force: true }) 
        console.log('Tabelas Sincronizadas!')
    }catch(err){
        console.error('ERRO: Não foi possível sincronizar as tabelas!', err)
    } finally {
        await conn.close()
        console.log('Conexão Finalizada!')
    }
}

syncDataBase()