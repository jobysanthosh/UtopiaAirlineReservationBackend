var mysql      = require('mysql');
const CONFIG = require('../config');

var connectionTest = mysql.createConnection({
    host     : CONFIG.testdb_host,
    port     : CONFIG.db_port,
    user     : CONFIG.testdb_user,
    password : CONFIG.testdb_password,
    database : CONFIG.db_name
});

connectionTest.connect(function(err){
if(!err) {
    console.log(" Test Database is connected ... ");    
} else {
    console.log("Error connecting  Test database ... ");    
}
});

module.exports = connectionTest;