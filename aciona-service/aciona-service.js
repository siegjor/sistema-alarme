const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let porta = 8090;
app.listen(porta, () => {
    console.log(`Servidor do acionamento em execução na porta: ${porta}`);
});

const Acionamento = require("./model/acionamento");

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://gabriel:.Lasanhaico030519@cluster0.xfugt.mongodb.net/AlarmeDB?retryWrites=true&w=majority";
const database_name = "AlarmeDB";
const collection_name = "Acionamento";
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

app.post("/Acionamento", (req, res, next) => {
    var acionamento = new Acionamento({
        acionado: req.body.acionado,
        horario: req.body.horario,
        idImovel: req.body.idImovel,
    });
    db.insertOne(acionamento, (err, result) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(
            `O alarme foi ${
                req.body.acionado === "true" ? "ativado" : "desativado"
            }`
        );
        res.send(
            `O alarme foi ${
                req.body.acionado === "true" ? "ativado" : "desativado"
            }`
        );
    });
});

// Obtém todos os acionamentos do alarme
app.get("/Acionamento", (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log(`Error: ${err}`);
        res.send(result);
    });
});

// Obtém acionamentos com base no ID do imóvel
app.get("/Acionamento/:idImovel", (req, res, next) => {
    const result = db
        .find({ idImovel: req.params.idImovel })
        .toArray((err, result) => {
            if (err) return console.log(`Error: ${err}`);
            res.send(result);
        });
});
