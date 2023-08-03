// Import required modules
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

// Create an instance of Express application
var app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

//Create database connection
const db = mysql.createConnection({
    host: 'hackathon2023-db.c19gu0njq6xi.ap-southeast-1.rds.amazonaws.com',
    user: 'hackathon2023',
    password: 'hackathon2023',
    database: 'hackathon2023_db',
});

//Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('connected to mysql...');
});

// Define the port number on which the server will listen
var port = process.env.PORT ||3000;
app.listen(port, () => {
    console.log('Running on port 3000');
});
// Export the Express app instance for external usage
module.exports = app;

//getAll
app.get('/tips', function (req, res) {
    db.query('SELECT * FROM Tips', function (error, results, fields) {
        try {
            return res.send({ error: false, data: results, message: 'Get All tips' });
        } catch (err) {
            console.log(err);
            return res.send({ error: true, data: results, message: err + "" });
        }
    });
});

//get by id
app.get('/tips/:id', function (req, res) {
    let id = req.params.id;
    db.query('SELECT * FROM Tips WHERE id = ? ', [id], function (error, results, fields) {
        try {
            return res.send({ error: false, data: results, message: 'Get Tips by ID ' + id });
        } catch (err) {
            console.log(err);
            return res.send({ error: true, data: results, message: err + "" });
        }
    });
});

//create new 
app.post('/tips', function (req, res) {

    let tip = req.body;
    console.log(req.body);
    db.query("INSERT INTO Tips SET ? ", tip, function (error, results, fields) {
        try {
            console.log(tip);
            return res.send({ error: false, data: results, message: 'Create New Tip Successfully.' });
        } catch (err) {
            console.log(err);
            return res.send({ error: true, data: results, message: err + "" });
        }
    });
});

//update
app.put('/tips/:id', function (req, res) {
    let id = req.params.id;
    let tip = req.body;
    db.query("UPDATE Tips SET ? WHERE id=?", [tip, id], function (error, results, fields) {
        try {
            console.log(tip);
            return res.send({ error: false, data: results, message: 'Update Tip '+id });
        } catch (err) {
            console.log(err);
            return res.send({ error: true, data: results, message: err + "" });
        }
    });
});

//delete
app.delete('/tips/:id', function (req, res) {
    let id = req.params.id;
    db.query('DELETE FROM Tips WHERE id = ? ', [id], function (error, results, fields) {
        try {
            return res.send({ error: false, data: results, message: 'Delete Tip by ID ' + id });
        } catch (err) {
            console.log(err);
            return res.send({ error: true, data: results, message: err + "" });
        }
    });
});






