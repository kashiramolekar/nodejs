const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'finexpress',
});

connection.connect(function (err) {
  if (err) throw err;

  const query = `
  SELECT E.Fname, E.Lname
  FROM Employee E
  JOIN WorksOn W ON E.Ssn = W.Essn
  WHERE W.Hours > 40;
  `;

  connection.query(query, function (err, results, fields) {
    if (err) throw err;

    console.log('Query result:');
    console.table(results);

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

