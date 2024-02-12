const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'finexpress',
});

connection.connect(function (err) {
  if (err) throw err;

  
  const employeesWithoutDependentsQuery = `
    SELECT E.Fname, E.Lname
    FROM Employee E
    WHERE NOT EXISTS (
      SELECT 1
      FROM Dependent D
      WHERE D.Essn = E.Ssn
    );
  `;

  connection.query(employeesWithoutDependentsQuery, function (err, results, fields) {
    if (err) throw err;

    console.log('Names of employees without dependents:');
    results.forEach((row) => {
      console.log(`${row.Fname} ${row.Lname}`);
    });

    
    connection.end(function (err) {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed');
      }
    });
  });
});
