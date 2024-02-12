const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'finexpress',
});

connection.connect(function (err) {
  if (err) throw err;

  // Find the department with the highest salary
  const highestSalaryQuery = `
    SELECT D.Dname
    FROM Department1 D
    JOIN Employee E ON D.Dnumber = E.Dno
    ORDER BY E.Salary DESC
    LIMIT 1;
  `;

  connection.query(highestSalaryQuery, function (err, results, fields) {
    if (err) throw err;

    const departmentWithHighestSalary = results[0].Dname;

    // Retrieve the names of all employees in the department with the highest salary
    const employeesInHighestSalaryDepartmentQuery = `
      SELECT E.Fname, E.Lname
      FROM Employee E
      JOIN Department1 D ON E.Dno = D.Dnumber
      WHERE D.Dname = ?;
    `;

    connection.query(employeesInHighestSalaryDepartmentQuery, [departmentWithHighestSalary], function (err, results, fields) {
      if (err) throw err;

      console.log(`Names of all employees in the department with the highest salary (${departmentWithHighestSalary}):`);
      results.forEach((row) => {
        console.log(`${row.Fname} ${row.Lname}`);
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
});
