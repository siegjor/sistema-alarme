const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CadastroSchema = new Schema({
    idImovel: {
        type: Number,
        required: [true, "ID do imóvel obrigatório"],
    },
    nome: {
        type: String,
        required: [true, "Nome obrigatório"],
        max: 100,
    },
    email: {
        type: String,
        required: [true, "E-mail obrigatório"],
        max: 100,
    },
    telefone: {
        type: String,
        required: [true, "Telefone obrigatório"],
    },
    cpf: {
        type: String,
        required: [true, "CPF obrigatório"],
    },
    endereco: {
        type: String,
        required: [true, "Endereço obrigatório"],
        max: 100,
    },
});

module.exports = mongoose.model("cadastro", CadastroSchema);
