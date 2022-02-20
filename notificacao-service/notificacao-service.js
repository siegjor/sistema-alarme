const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let porta = 8050;
app.listen(porta, () => {
    console.log("Servidor em execução na porta: " + porta);
});

const Cadastro = require("../model/cadastro");

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

exports.notificacao = function () {
    app.get("/Cadastro/:idImovel", (req, res, next) => {
        const idImovel = req.params.idImovel;
        const nome = req.params.nome;
        const telefone = req.params.telefone;
        const endereco = req.params.endereco;

        const result = db
            .find({ idImovel: req.params.idImovel })
            .toArray((err, result) => {
                if (err) return console.log(`Error: ${err}`);
                res.send(result);
                console.log(
                    `Pessoa identificada! Informações para contato com o proprietário: \nID do imóvel: ${idImovel}\nNome: ${nome}\nTelefone: ${telefone}\Endereço: ${endereco}`
                );
            });
    });
};
