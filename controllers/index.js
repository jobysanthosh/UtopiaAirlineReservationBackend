const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const router = express.Router();
const bodyParser = require('body-parser')
var db = require('../dao/db');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    // getPayment = function (cb) {
    const query = 'select * from UtopiaAirline.CardDetails';
    db.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message, }
            res.send(response);
        }

        const payments = [...results];
        const response = {
            data: payments,
            message: 'All payments successfully retrieved.',
        }
        res.send(response);
    });
});

//     db.query('select * from UtopiaAirline.CardDetails', function (err, result) {
//         cb(err, result);
//     });
// };

//     getPayment(function (error, result) {
//         if (error) throw error;
//         //res.setHeader('Content-Type', 'application/json');
//         res.send(result);
//     });
// });

                                //GET PAYMENT BY ID

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `select * from UtopiaAirline.CardDetails where userId =${id}`;
    db.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message, }
            res.send(response)
        }
        const payments = results[0]
        const response = {
            data: payments,
            message: `payment successfully retrieved.`,
        }
        res.status(200).send(response)
    });
});

//PLEASE ENABLE THE HEADER "CONTENT_TYPE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
router.post('/', (req, res) => {
    const { userId, cardNumber, cardType, expirationDate, nameOnCard } = req.body
  
    const query = `INSERT INTO UtopiaAirline.CardDetails (userId, cardNumber, cardType, expirationDate, nameOnCard) VALUES ('${userId}', '${cardNumber}', '${cardType}', '${expirationDate}', '${nameOnCard}')`
    db.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message, }
        res.send(response)
      }
  
      
      const payment = { userId, cardNumber, cardType, expirationDate, nameOnCard }
      const response = {
        data: payment,
        message: `Payment ${nameOnCard} successfully added.`,
      }
      res.status(201).send(response)
    })
  })

//PLEASE ENABLE THE HEADER "CONTENT_TYPE AND "id=?"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
router.put('/', (req, res) => {
    var payment = req.body;
    payment.userId=req.headers.id;
    updatePayment = function(payment, cb){
        db.beginTransaction(function(err){
            if(err) cb(err, null);

              db.query('update UtopiaAirline.CardDetails set cardNumber = ?, cardType = ?, expirationDate = ?, nameOnCard = ? where userId = ?', [payment.cardNumber, payment.cardType, payment.expirationDate, payment.nameOnCard, payment.userId], function(err, res){
                if(err){
                  db.rollback(function(err, res){
                    cb(err, res);
                  });
                } 
                db.commit(function(err, res){
                  cb(err, res);
                });
              });
            });
      };

    updatePayment(payment, function(err, result){
      if(err){
        res.status(400);
        res.send('Update payment Failed!');
      }
      res.status(201);
      res.send('Update payment Successful!');
    });
});

router.delete('/', (req, res) => {
    deletePayment = function(userId, cb){
        db.beginTransaction(function(err){
            if(err) cb(err, null);

            db.query('delete from UtopiaAirline.CardDetails where userId = ?', [userId], function(err, res){
              if(err){
                db.rollback(function(err, res){
                  cb(err, res);
                });
              } 
              db.commit(function(err, res){
                cb(err, res);
              });
        });
    });
};

    deletePayment(req.headers.id, function(err, result){
      if(err){
        res.status(400);
        res.send('Delete payment Failed!');
      }
      res.send('Delete payment Successful!');
    });
  });


module.exports = router;