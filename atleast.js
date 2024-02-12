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
        SELECT E.Fname, E.Lname
        FROM Employee E
        WHERE E.Salary >= (
            SELECT MIN(Salary) + 20000
            FROM Employee
        );
    `;

    connection.query(query, function (err, results, fields) {
        if (err) throw err;

        console.log('Employees making at least Rs 20,000 more than the lowest paid employee:');
        results.forEach((row) => {
            console.log(`${row.Fname} ${row.Lname}`);
        });

        connection.end();
    });
});
