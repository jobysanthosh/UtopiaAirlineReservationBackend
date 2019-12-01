require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.db_dialect   = process.env.DB_DIALECT
CONFIG.db_host      = process.env.DB_HOST
CONFIG.db_port      = process.env.DB_PORT
CONFIG.db_name      = process.env.DB_NAME
CONFIG.db_user      = process.env.DB_USER
CONFIG.db_password  = process.env.DB_PASSWORD
CONFIG.stripe_secretkey = process.env.STRIPE_SECRETKEY
// CONFIG.stripSecretKey = process.env.STRIPE_SECRET_KEY
// CONFIG.stripePublicKey = process.env.STRIPE_PUBLIC_KEY

module.exports = CONFIG