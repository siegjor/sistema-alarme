const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let porta = 8070;
app.listen(porta, () => {
    console.log(`Servidor do status em execução na porta: ${porta}`);
});

const Status = require("./model/status");

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://gabriel:.Lasanhaico030519@cluster0.xfugt.mongodb.net/AlarmeDB?retryWrites=true&w=majority";
const database_name = "AlarmeDB";
const collection_name = "Status";
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

app.post("/Status", (req, res, next) => {
    var status = new Status({
        mensagem: req.body.mensagem,
        idImovel: req.body.idImovel,
    });

    db.insertOne(status, (err, result) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(`Mensagem recebida: ${req.body.mensagem}`);
        res.send(`Mensagem recebida: ${req.body.mensagem}`);
    });
});

// Obtém todos os acionamentos
app.get("/Status", (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log(`Error: ${err}`);
        res.send(result);
    });
});

// Obtém status da conexão à central do usuário com base no id do imovel
app.get("/Status/:idImovel", (req, res, next) => {
    const result = db
        .find({ idImovel: req.params.idImovel })
        .toArray((err, result) => {
            if (err) return console.log(`Error: ${err}`);
            res.send(result);
        });
});
