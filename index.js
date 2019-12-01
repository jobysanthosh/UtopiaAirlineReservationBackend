const serverless = require('serverless-http');
const server = require('./main');
const handler = serverless(server);

module.exports.server = async (event, context) => {
 return await handler(event, context);
};