const express = require("express");
const bodyParser = require("body-parser");
const Cadastro = require("./model/cadastro");

const app = express();

let porta = 8080;
app.listen(porta, () => {
    console.log(`Servidor do cadastro em execução na porta: ${porta}`);
});

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://gabriel:.Lasanhaico030519@cluster0.xfugt.mongodb.net/AlarmeDB?retryWrites=true&w=majority";
const database_name = "AlarmeDB";
const collection_name = "Cadastro";
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

// Cria um cadastro
app.post("/Cadastro", (req, res, next) => {
    var proprietario = new Cadastro({
        idImovel: req.body.idImovel,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        endereco: req.body.endereco,
    });
    db.insertOne(proprietario, (err, result) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(`Proprietário ${req.body.nome} cadastrado com sucesso!`);
        res.send(`Proprietário ${req.body.nome} cadastrado com sucesso!`);
    });
});

// Obtém todos os cadastros
app.get("/Cadastro", (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log(`Error: ${err}`);
        res.send(result);
    });
});

// Obtém cadastro do usuário com base no id imovel
app.get("/Cadastro/:idImovel", (req, res, next) => {
    const result = db.findOne(
        { idImovel: req.params.idImovel },
        (err, result) => {
            if (err) return console.log("Proprietário não encontrado");
            res.send(result);
        }
    );
});

// Altera um cadastro
app.put("/Cadastro/:idImovel", (req, res, next) => {
    db.updateOne(
        { idImovel: req.params.idImovel },
        {
            $set: {
                cpf: req.body.cpf,
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
            },
        },
        (err, result) => {
            if (err) return console.log("Error: " + err);
            console.log(
                `Cadastro do proprietário ${req.body.nome} alterado com sucesso!`
            );
            res.send(
                `Cadastro do proprietário ${req.body.nome} alterado com sucesso!`
            );
        }
    );
});

// Remove cadastro de usuário
app.delete("/Cadastro/:idImovel", (req, res, next) => {
    db.deleteOne({ idImovel: req.params.idImovel }, (err, result) => {
        if (err) return console.log(`Error: ${err}`);
        console.log(`Cadastro do proprietário ${req.body.nome} removido!`);
        res.send(`Cadastro do proprietário ${req.body.nome} removido!`);
    });
});
