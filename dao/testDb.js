var mysql      = require('mysql');
// const CONFIG = require('../config');

var connectionTest = mysql.createConnection({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'Brownlenovo5!',
    database : 'UtopiaAirline'
});

connectionTest.connect(function(err){
if(!err) {
    console.log(" Test Database is connected ... ");    
} else {
    console.log("Error connecting  Test database ... ");    
}
});

module.exports = connectionTest;