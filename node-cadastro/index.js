const express = require("express"); // servdidor
const bodyParser = require('body-parser'); // middleware
const cors = require('cors');
const { USERS } = require('./in-memory-db');
const xml2js = require('xml2js');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'application/xml' }));
app.use(cors({origin: true, credentials: true})); // permite que qualquer domínio acesse o servidor e envie credenciais (como cookies) nas requisições.

const HOST = 'localhost';
const PORT = 9000;

// Rotas
app.post('/verificar-usuario', (req, res) => {
    const username = req.body;
  
    // Verifica se o nome de usuário já está na lista
    const userExists = USERS.some(user => user.username === username);
  
    // Cria o objeto XML de resposta
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ exists: userExists });
  
    res.type('application/xml');
    res.send(xml);
  });

  app.post('/login-usuario', (req, res) => {
    const userString = req.body;
    const userArray = userString.split('&');
    const userObj = {};
  
    for (let i = 0; i < userArray.length; i++) {
        const [key, value] = userArray[i].split('=');
        userObj[key] = value;
    }
  
    console.log(userObj);
    console.log(userObj.username);
    
    const userExists = USERS.some(user => user.username === userObj.username && user.password === userObj.password);

    console.log(userExists);
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ success: userExists });
  
    res.type('application/xml');
    res.send(xml);
  });
  
app.post('/cadastrar-usuario', (req, res) => {
    
    const userString = req.body;
    const userArray = userString.split('&');
    const user = {};

    for (let i = 0; i < userArray.length; i++) {
        const [key, value] = userArray[i].split('=');
        user[key] = value;
    }

    console.log(user);
    console.log(user.username);
  
    // Adiciona o novo usuário ao banco de dados temporário
    USERS.push(user);
  
    // Cria o objeto XML de resposta
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ success: true });
  
    res.type('application/xml');
    res.send(xml);
  });

app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
})