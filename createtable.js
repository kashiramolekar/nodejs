const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "bus"
});

con.connect((err)=>
{
    if (err) throw err;
    console.log("connected successfully");
    q="CREATE DATABASE bus"
    con.query(q,(err,result)=>{
        if (err) throw err;
        console.log("database created successfully");
    });
});