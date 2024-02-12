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

con.connect(function(err) {
    if (err) throw err;

    var createDepartmentTable = 'CREATE TABLE IF NOT EXISTS Department1 (Dnumber INT PRIMARY KEY, Dname varchar(30), Mgr_ssn int(5), Mgr_start_date DATE)';
    con.query(createDepartmentTable, function(err, result) {
        if (err) throw err;
        console.log("Department table created");

        
    });
    var createEmployeeTable = `
            CREATE TABLE IF NOT EXISTS Employee (
                Fname VARCHAR(255),
                Minit CHAR(1),
                Lname VARCHAR(255),
                Ssn CHAR(9) PRIMARY KEY,
                Bdate DATE,
                Address VARCHAR(255),
                Sex CHAR(1),
                Salary DECIMAL(10, 2),
                Super_ssn CHAR(9),
                Dno INT,
                FOREIGN KEY (Super_ssn) REFERENCES Employee(Ssn),
                FOREIGN KEY (Dno) REFERENCES Department(Dnumber)
            )
        `;
        con.query(createEmployeeTable, function(err, result) {
            if (err) throw err;
            console.log("Employee table created");
        });
        var createDepartmentLocationTable = `
        CREATE TABLE IF NOT EXISTS Department_Location (
            Dnumber INT,
            Dlocation VARCHAR(255),
            PRIMARY KEY (Dnumber, Dlocation),
            FOREIGN KEY (Dnumber) REFERENCES Department(Dnumber)
        )
    `;
    con.query(createDepartmentLocationTable, function(err, result) {
        if (err) throw err;
        console.log("Department_Location table created");
    });
    var createProjectTable = `
        CREATE TABLE IF NOT EXISTS Project (
            Pname VARCHAR(255),
            Pnumber INT PRIMARY KEY,
            Plocation VARCHAR(255),
            Dnum INT,
            FOREIGN KEY (Dnum) REFERENCES Department(Dnumber)
        )
    `;
    con.query(createProjectTable, function(err, result) {
        if (err) throw err;
        console.log("Project table created");
    });
    var createWorksOnTable = `
    CREATE TABLE IF NOT EXISTS WorksOn (
        Essn CHAR(9),
        Pno INT,
        Hours INT,
        PRIMARY KEY (Essn, Pno),
        FOREIGN KEY (Essn) REFERENCES Employee(Ssn),
        FOREIGN KEY (Pno) REFERENCES Project(Pnumber)
    )
`;
con.query(createWorksOnTable, function(err, result) {
    if (err) throw err;
    console.log("WorksOn table created");
});
var createDependentTable = `
CREATE TABLE IF NOT EXISTS Dependent (
    Essn CHAR(9),
    Dependent_name VARCHAR(255),
    Sex CHAR(1),
    Bdate DATE,
    Relationship VARCHAR(255),
    PRIMARY KEY (Essn, Dependent_name),
    FOREIGN KEY (Essn) REFERENCES Employee(Ssn)
)
`;
con.query(createDependentTable, function(err, result) {
if (err) throw err;
console.log("Dependent table created");
});
});
