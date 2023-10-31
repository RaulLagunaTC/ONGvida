//requisitando os códigos
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");

//configurando o express para o postman e para usar a página
const app = express();
app.use(bodyparser.json());
const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/teste",
    {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    }
    )

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
    nome: {type : String},
    email: {type : String, required : true},
    endereco : {type : String},
    numero : {type: Number, required : true},
    cep : {type : String, required : true},
    nascimento : {type : Date, required : true}
})

const Usuario = mongoose.model("Usuario",UsuarioSchema);
 
//configuração dos roteamentos
//cadastroUsuario
 
app.post("/cadastrousuario" , async(req , res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const cep = req.body.cep;
    const nascimento = req.body.nascimento;
 
const usuario = new Usuario({
    nome : nome,
    email : email,
    endereco : endereco,
    numero : numero,
    cep : cep,
    nascimento : nascimento
});
 
try{
    const newUsuario = await usuario.save();
    res.json({error : null, msg: "Cadastro OK", UsuarioId : newUsuario._id});
} catch (error){}
});

//rota de get de formulario

app.get("/cadastrousuario" , async(req, res)=>{
    res.sendFile(__dirname + "/cadastrousuario.html")
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})