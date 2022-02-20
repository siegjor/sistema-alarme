const httpProxy = require("express-http-proxy");
const express = require("express");
const app = express();
var logger = require("morgan");

app.use(logger("dev"));

function selectProxyHost(req) {
    if (req.path.startsWith("/Cadastro")) return "http://localhost:8080/";
    else if (req.path.startsWith("/Aciona")) return "http://localhost:8090/";
    else if (req.path.startsWith("/Status")) return "http://localhost:8070/";
    else if (req.path.startsWith("/Monitoramento"))
        return "http://localhost:8060/";
    else if (req.path.startsWith("/Notificacao"))
        return "http://localhost:8040/";
}

app.use((req, res, next) => {
    httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(8000, () => {
    console.log("API Gateway iniciado!");
});
