const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const notificacao = require("../notificacao-service/notificacao-service");

let porta = 8060;
app.listen(porta, () => {
    console.log("Servidor em execução na porta: " + porta);
});

const Status = require("./model/monitoramento");

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://gabriel:.Lasanhaico030519@cluster0.xfugt.mongodb.net/AlarmeDB?retryWrites=true&w=majority";
const database_name = "AlarmeDB";
const collection_name = "Monitoramento";
var db;

MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            console.log(
                `ERRO: não foi possível conectar à base de dados '${database_name}'.`
            );
            throw error;
        }
        db = client.db(database_name).collection(collection_name);
        console.log(`Conectado à base de dados '${database_name}'!`);
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/Monitoramento", (req, res, next) => {
    var status = new Status({
        idSensor: req.body.idSensor,
        horario: req.body.horario,
        idImovel: req.body.idImovel,
    });

    db.insertOne(status, (err, result) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(`Pessoa identificada pelo sensor ${req.body.idSensor}`);
        res.send(`Pessoa identificada pelo sensor ${req.body.idSensor}`);
    });
    notificacao.notificacao();
});

// Obtém todos as detecções
app.get("/Monitoramento", (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log(`Error: ${err}`);
        res.send(result);
    });
});

// Obtém as detecções com base no id do imóvel
app.get("/Monitoramento/:idImovel", (req, res, next) => {
    const result = db
        .find({ idImovel: req.params.idImovel })
        .toArray((err, result) => {
            if (err) return console.log(`Error: ${err}`);
            res.send(result);
        });
});
