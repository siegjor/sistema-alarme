const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

let porta = 8040;
app.listen(porta, () => {
    console.log("Servidor em execução na porta: " + porta);
});

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://gabriel:.Lasanhaico030519@cluster0.xfugt.mongodb.net/AlarmeDB?retryWrites=true&w=majority";
const database_name = "AlarmeDB";
const collection_name = "Notificacao";
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

app.get("/Notificacao/:idImovel", (req, res, next) => {
    console.log(req.params.idImovel);
    axios
        .get(`http://localhost:8080/Cadastro/${req.params.idImovel}`)
        .then((resp) => {
            console.log(
                `Presença detectada! Informações para contato com o proprietário: \n\tID do imóvel: ${resp.data.idImovel}\n\tNome: ${resp.data.nome}\n\tTelefone: ${resp.data.telefone}\n\tEndereço: ${resp.data.endereco}`
            );
        });
});
