const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatusSchema = new Schema({
    mensagem: {
        type: String,
        required: [true, "Status do estado do alarme obrigatório"],
        max: 100,
    },
    idImovel: {
        type: Number,
        required: [true, "ID do imóvel obrigatório"],
    },
});

module.exports = mongoose.model("status", StatusSchema);
