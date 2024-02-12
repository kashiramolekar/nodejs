const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'fin',
});

connection.connect(function (err) {
  if (err) throw err;

  // Insert into 'Department1' table
  const insertDepartmentQuery = `
    INSERT INTO Department1 (Dnumber, Dname, Mgr_ssn, Mgr_start_date)
    VALUES
    (1, 'IT Department', 111111111, '2023-01-01'),
    (2, 'Finance Department', 222222222, '2023-01-01'),
    (3, 'Marketing Department', 333333333, '2023-01-01');
  `;
  connection.query(insertDepartmentQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "Department1" table');
  });

  // Insert into 'Employee' table
  const insertEmployeeQuery = `
    INSERT INTO Employee (Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno)
    VALUES
    ('John', 'D', 'Doe', '111111111', '1990-01-01', '123 Main St', 'M', 50000, '222222222', 1),
    ('Jane', 'A', 'Doe', '222222222', '1991-02-02', '456 Oak St', 'F', 45000, '333333333', 2),
    ('Bob', 'B', 'Smith', '333333333', '1985-03-03', '789 Pine St', 'M', 55000, NULL, 3);
  `;
  connection.query(insertEmployeeQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "Employee" table');
  });

  // Insert into 'Department_Location' table
  const insertDepartmentLocationQuery = `
    INSERT INTO Department_Location (Dnumber, Dlocation)
    VALUES
    (1, 'Location1'),
    (2, 'Location2'),
    (3, 'Location3');
  `;
  connection.query(insertDepartmentLocationQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "Department_Location" table');
  });

  // Insert into 'Project' table
  const insertProjectQuery = `
    INSERT INTO Project (Pname, Pnumber, Plocation, Dnum)
    VALUES
    ('Project1', 1, 'Location1', 1),
    ('Project2', 2, 'Location2', 2),
    ('Project3', 3, 'Location3', 3);
  `;
  connection.query(insertProjectQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "Project" table');
  });

  // Insert into 'WorksOn' table
  const insertWorksOnQuery = `
    INSERT INTO WorksOn (Essn, Pno, Hours)
    VALUES
    ('111111111', 1, 40),
    ('222222222', 2, 45),
    ('333333333', 3, 50);
  `;
  connection.query(insertWorksOnQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "WorksOn" table');
  });

  // Insert into 'Dependent' table
  const insertDependentQuery = `
    INSERT INTO Dependent (Essn, Dependent_name, Sex, Bdate, Relationship)
    VALUES
    ('111111111', 'Alice Doe', 'F', '2010-01-01', 'Child'),
    ('222222222', 'Bob Doe', 'M', '2012-02-02', 'Child'),
    ('333333333', 'Charlie Smith', 'M', '2005-03-03', 'Child');
  `;
  connection.query(insertDependentQuery, function (err, result) {
    if (err) throw err;
    console.log('Inserted records into "Dependent" table');
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
