const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'finexpress',
});

connection.connect(function (err) {
  if (err) throw err;

  const query = `
    SELECT D.Dname AS DepartmentName, COUNT(E.Ssn) AS NumberOfFemaleEmployees
    FROM Department1 D
    JOIN Employee E ON D.Dnumber = E.Dno
    WHERE E.Salary > 40000 AND E.Sex = 'F'
    GROUP BY D.Dname;
  `;

  connection.query(query, function (err, results, fields) {
    if (err) throw err;

    console.log('Number of female employees in each department making more than Rs. 40,000:');
    results.forEach((row) => {
      console.log(`${row.DepartmentName}: ${row.NumberOfFemaleEmployees} female employees`);
    });

    // Close the database connection
    connection.end(function (err) {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed');
      }
    });
  });
});
