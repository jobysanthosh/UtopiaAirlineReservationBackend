var mysql      = require('mysql');
const CONFIG = require('../config');

var connection = mysql.createConnection({
    host     : CONFIG.db_host,
    port     : CONFIG.db_port,
    user     : CONFIG.db_user,
    password : CONFIG.db_password,
    database : CONFIG.db_name
});

connection.connect(function(err){
if(!err) {
    console.log("AWS Database is connected ... ");    
    
} else {
    console.log("Error connecting AWS database ... ");   
    console.log(db_host); 

}
});

module.exports = connection;