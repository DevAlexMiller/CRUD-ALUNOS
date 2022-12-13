const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'alunos',
});




//------------------------POST--------------------------
app.post('/create', (req, res) => {
    const nome = req.body.usuario
    const email = req.body.email
    const senha = req.body.senha

    db.query(`INSERT INTO alunos (nome, email, senha) VALUES (?,?,?)`,
    [nome, email, senha],
    (err, result) => {
        if(err) {
            console.log(err)
        } else{
            res.send("dados enviados");
        }
    });
});



//------------------------GET--------------------------
app.get('/cadastros', (req, res) => {
    db.query('SELECT * FROM alunos', (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.get('/cadastros/:id', function (req, res) {
    var index = req.params.id
    let sql = `select * from alunos where id = ${index}`
    db.query(sql, function(err, result){
        if (err) throw err
        res.send(result)
    }) 
});

//------------------------PUT--------------------------
app.put('/update', (req, res) => {
    const id = req.body.id;
    const senha = req.body.senha;
    const email = req.body.email;
    const nome = req.body.usuario;
    db.query(`UPDATE alunos SET senha = '${senha}', email = '${email}', nome = '${nome}'  WHERE id = '${id}'`,
     (err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    });
})



//------------------------DELETE--------------------------
app.delete('/delete/:id', (req, res) => {
    const id =req.params.id;
    db.query(`DELETE FROM alunos WHERE id = ${id}`, (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result);
        }
    });
})



app.listen(3001, () => {
    console.log("running on 3001")
});