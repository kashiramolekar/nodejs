var mysql = require('mysql2');
var con=mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE lib",
    function(err,result){
        if(err) throw err;
        console.log("Database created");
    });
});