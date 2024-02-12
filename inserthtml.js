const http = require('http');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'finexpress',
});

const htmlForm = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Data Insert Form</title>
</head>
<body>

  <h1>Insert Employee Data</h1>

  <form action="/submit" method="post">
    <label for="Fname">First Name:</label>
    <input type="text" name="Fname" required><br>

    <label for="Minit">Middle Initial:</label>
    <input type="text" name="Minit"><br>

    <label for="Lname">Last Name:</label>
    <input type="text" name="Lname" required><br>

    <label for="Ssn">Social Security Number:</label>
    <input type="number" name="Ssn" required><br>

    <label for="Bdate">Birth Date:</label>
    <input type="date" name="Bdate" required><br>

    <label for="Address">Address:</label>
    <input type="text" name="Address" required><br>

    <label for="Sex">Sex:</label>
    <input type="text" name="Sex" required><br>

    <label for="Salary">Salary:</label>
    <input type="number" name="Salary" required><br>

    <label for="Super_ssn">Supervisor SSN:</label>
    <input type="number" name="Super_ssn"><br>

    <label for="Dno">Department Number:</label>
    <input type="number" name="Dno" required><br>

    <button type="submit">Submit</button>
  </form>

  <script src="/newinsert.js"></script>

</body>
</html>
`;

app.get('/send', function (req, res) {
  res.send(htmlForm);
});

app.post('/submit', urlencodedParser, function (req, res) {
  const { Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno } = req.body;

  const insertEmployeeQuery = `
    INSERT INTO Employee (Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  con.query(
    insertEmployeeQuery,
    [Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno],
    function (err, result) {
      if (err) {
        console.error('Error inserting into "Employee" table:', err);
        res.send('Error');
      } else {
        console.log('Inserted records into "Employee" table');
        res.send('Success');
      }
    }
  );
});

const server = http.createServer(app);

server.listen(9001, () => {
  console.log('Server running at http://localhost:9001/');
});
