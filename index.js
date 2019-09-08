const mysql = require ('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log('Connection to database succeded.');
    else 
        console.log('Connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        
});

app.listen(3000, ()=>console.log('Express server is running at port no: 3000'));

//get all
app.get('/items',(_req,res)=>{
    mysqlconnection.query('SELECT * FROM items',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);    
    })
});

//get item
app.get('/items/:id' ,(req,res)=>{
    mysqlconnection.query('SELECT * FROM items WHERE id = ?', [req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete
app.delete('/items/:id', (req,res)=>{
    mysqlconnection.query('DELETE FROM items WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send('Entry deleted');
        else
        console.log(err);
    })
});

//route for insert data
app.post('/save',(req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  });
  
  //route for update data
  app.post('/update',(req, res) => {
    let sql = "UPDATE items SET _name='"+req.body._name+"', _qty='"+req.body._qty+"' WHERE _amount="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  });
 
  