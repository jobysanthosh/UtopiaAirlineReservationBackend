var mysql      = require('mysql');
// const CONFIG = require('../config');

var connection = mysql.createConnection({
    host     : db_host,
    port     : db_port,
    user     : db_user,
    password : db_password,
    database : db_name
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