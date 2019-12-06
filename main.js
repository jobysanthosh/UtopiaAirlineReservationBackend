var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const apiRouter = require('./controllers/index.js');
const apiRouterTest = require('./test/index.js');
const errorHandler = require('./helpers/errorHandler');

const server = express();
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true })); 
server.use(cors());
// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//server.use(require('./controllers/paymentController.js'));
const configureRoutes = require("./routes")
configureRoutes(server);


server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Payment Service on AWS Lambda!' });
 });

server.use('/payment', apiRouter);
server.use('/paymentTest', apiRouterTest);

server.use(errorHandler.notFound);
server.use(errorHandler.internalServerError);

module.exports = server;

//ERROR CHECK : serverless logs -f server -t
console.log("hello");
server.listen(8000);
console.log('Server running in port: 8000 ...')
