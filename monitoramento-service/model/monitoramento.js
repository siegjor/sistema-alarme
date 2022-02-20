const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MonitoramentoSchema = new Schema({
    idSensor: {
        type: Number,
        required: [true, "Id do sensor obrigatório"],
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

module.exports = mongoose.model("monitoramento", MonitoramentoSchema);
