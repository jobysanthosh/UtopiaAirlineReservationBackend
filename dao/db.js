var mysql      = require('mysql');
// const CONFIG = require('../config');

var connection = mysql.createConnection({
    host     : 'lms.cv2mc6y2qhct.us-east-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'admin',
    password : 'teamflash123',
    database : 'UtopiaAirline'
});

connection.connect(function(err){
if(!err) {
    console.log("AWS Database is connected ... ");   
    console.log(connection.config.host); 
    
} else {
    console.log("Error connecting AWS database ... ");   
    //console.log(db_host); 

}
});

module.exports = connection;