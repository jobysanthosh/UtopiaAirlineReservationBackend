// var routes = require('express').Router();
// var db = require('../dao/db');
// var paymentDao = require('../dao/paymentDao');

// routes.get('/payment',function(req,res){
//     paymentDao.getPayment(function(error, result){
//       if(error) throw error;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(result);
//     });
// });

// routes.get('/payment/:id',function(req,res){
//     paymentDao.getOnePayment(req.params.id, function(error, result){
//       if(error) throw error;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(result);
//     });
// });

// routes.post('/payment', function(req, res){
//     var payment = req.body;
//     paymentDao.createPayment(payment, function(err, result){
//       if(err){
//         res.status(400);
//         res.send('Add payment Failed!');
//       }
//       res.status(201);
//       res.send('Add payment Successful!');
//     });
// });

// routes.put('/payment', function(req, res){
//     var payment = req.body;
//     payment.userId=req.headers.id;
//     paymentDao.updatePayment(payment, function(err, result){
//       if(err){
//         res.status(400);
//         res.send('Add payment Failed!');
//       }
//       res.status(201);
//       res.send('Add payment Successful!');
//     });
// });

// routes.delete('/payment', function(req, res){
//     paymentDao.deletePayment(req.headers.id, function(err, result){
//       if(err){
//         res.status(400);
//         res.send('Delete payment Failed!');
//       }
//       res.send('Delete payment Successful!');
//     });
//   });

//   module.exports = routes;
  