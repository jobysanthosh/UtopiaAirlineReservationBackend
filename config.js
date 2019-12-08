require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.db_dialect   = process.env.DB_DIALECT
CONFIG.db_host      = process.env.DB_HOST
CONFIG.db_port      = process.env.DB_PORT
CONFIG.db_name      = process.env.DB_NAME
CONFIG.db_user      = process.env.DB_USER
CONFIG.db_password  = process.env.DB_PASSWORD
CONFIG.stripe_secretkey = process.env.STRIPE_SECRETKEY
CONFIG.digestAlgorithm = process.env.DIGESTALGORITHM

CONFIG.testdb_host  = process.env.TESTDB_HOST
CONFIG.testdb_user  = process.env.TESTDB_USER
CONFIG.testdb_password  = process.env.TESTDB_PASSWORD

module.exports = CONFIG