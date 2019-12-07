var mysql      = require('mysql');
// const CONFIG = require('../config');

var connectionTest = mysql.createConnection({
    host     : testdb_host,
    port     : db_port,
    user     : testdb_user,
    password : testdb_password,
    database : db_name
});

connectionTest.connect(function(err){
if(!err) {
    console.log(" Test Database is connected ... ");    
} else {
    console.log("Error connecting  Test database ... ");    
}
});

module.exports = connectionTest;