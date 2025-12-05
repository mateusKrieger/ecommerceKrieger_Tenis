const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Estoque = db.define('estoque',{
    codEstoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduto: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos', 
            key: 'codProduto'  
        }
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    qtdeMovimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 
    },
    quantidade_minima: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5 // Quantidade mínima
    }
},{
    // ALTERADO: Manter timestamps (createdAt e updatedAt) é útil para auditoria do estoque
    timestamps: true, 
    tableName: 'estoques'
})

module.exports = Estoque