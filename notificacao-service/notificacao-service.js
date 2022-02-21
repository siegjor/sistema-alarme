const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

let porta = 8040;
app.listen(porta, () => {
    console.log(`Servidor da notificação em execução na porta: ${porta}`);
});

const MongoClient = require("mongodb").MongoClient;
const uri = "uri do mongo";
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

// Exibe a notificação na tela com base no ID do imóvel em que ocorreu a conexão
app.get("/Notificacao/:idImovel", (req, res, next) => {
    axios
        .get(`http://localhost:8080/Cadastro/${req.params.idImovel}`)
        .then((resp) => {
            console.log(
                `\nPresença detectada! Informações para contato com o proprietário: \n\tID do imóvel: ${resp.data.idImovel}\n\tNome: ${resp.data.nome}\n\tTelefone: ${resp.data.telefone}\n\tEndereço: ${resp.data.endereco}`
            );
        });
});
