const express = require('express')
const pg = require('pg');
const bodyParser = require('body-parser'); 
var cors = require('cors');

const app = express();

app.use(bodyParser.json());

const hostname = 'fast-atoll-84608.herokuapp.com';
const port = process.env.PORT || 4000;

app.use(cors());

const config = {
  host: 'rogue.db.elephantsql.com',
  user: 'koqlosfo',     
  password: 'yI5RFNscREAHZKC2s0NdHoS9dJEm26eR',
  database: 'koqlosfo',
  port: 5432,
  ssl: true
};

const client = new pg.Client(config);
client.connect(err => {
  if (err) throw err;
  else {
      
  }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  
app.listen(port, () => {
    console.log('Example app listening on port '+ port)
  });


app.get('/showRegistered', (req, res) =>{
  getAll(req,res);
});

async function getAll(req, res) {
  const findAllQuery = 'SELECT ID, FirstName, LastName FROM users';
  try {
    const rep = await client.query(findAllQuery);
    console.log(rep);
    return res.status(200).send(rep);
  } catch(error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

app.post('/registration',(req, res) =>{
  const request = req;
  console.log(req);
  addUser(request,res);
})

async function addUser(request, res) {
  const InsertQuery = `INSERT INTO users (ID, FirstName, LastName, Login, Password) VALUES (DEFAULT, '` + request.body.FirstName + `', '` + request.body.LastName + `', '` + request.body.Login + `', '` + request.body.Haslo + `')`;
  
  try {

    await client.query(InsertQuery);
    console.log("sdkslkfusfbbinfnebfbwofn");
    return res.status(200).send("Ok");
  } catch(error) {
    console.log("xxxxx");
    console.log(error);
    return res.status(400).send(error);
  }
};