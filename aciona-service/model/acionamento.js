const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AcionamentoSchema = new Schema({
    acionado: {
        type: Boolean,
        required: [true, "Status do estado do alarme obrigatório"],
    },
    horario: {
        type: Date,
        default: Date.now(),
    },
    idImovel: {
        type: Number,
        required: [true, "ID do imóvel obrigatório"],
    },
});

module.exports = mongoose.model("acionamento", AcionamentoSchema);
