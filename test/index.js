const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const testDb = require('../dao/testDb');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// GET ALL PAYMENTS
router.get('/', (req, res) => {
  const query = 'select * from UtopiaAirline.CardDetails';

  testDb.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message, }
      res.send(response);
    }
    if (results.length == 0) {
      const response = { message: `Payment doesn't exist` };
      res.status(404).send(response)
    }
    const payments = [...results];
    const response = {
      data: payments,
      message: 'All payments successfully retrieved.',
    }
    res.send(response);
  });
});

//GET PAYMENT BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `select * from UtopiaAirline.CardDetails where userId =${id}`;
  testDb.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message, }
      res.send(response);
    }
    if (results.length == 0) {
      const response = { message: `Payment doesn't exist` };
      res.status(404).send(response)
    }
    else {
      const payments = results[0]
      const response = {
        data: payments,
        message: `payment successfully retrieved.`,
      }
      res.status(200).send(response)
    }
  });
});

//PLEASE ENABLE THE HEADER "CONTENT_TYPE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
router.post('/', (req, res) => {
  const { cardNumber, cardType, expirationDate, nameOnCard } = req.body
  userId = req.header('userId');

  const query = `INSERT INTO UtopiaAirline.CardDetails (userId, cardNumber, cardType, expirationDate, nameOnCard) VALUES ('${userId}', '${cardNumber}', '${cardType}', '${expirationDate}', '${nameOnCard}')`
  testDb.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message, }
      res.send(response)
    }

    const payment = { userId, cardNumber, cardType, expirationDate, nameOnCard }
    const response = {
      data: payment,
      message: `Payment information of '${nameOnCard}' successfully added.`,
    }
    res.status(201).send(response)
  })
});


//PLEASE ENABLE THE HEADER "CONTENT_TYPE AND "id=?"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
router.put('/', (req, res) => {
  var payment = req.body;
  payment.userId = req.header('userId');
  updatePayment = function (payment, cb) {
    testDb.beginTransaction(function (err) {
      if (err) cb(err, null);

      testDb.query('update UtopiaAirline.CardDetails set cardNumber = ?, cardType = ?, expirationDate = ?, nameOnCard = ? where userId = ?', [payment.cardNumber, payment.cardType, payment.expirationDate, payment.nameOnCard, payment.userId], function (err, res) {
        if (err) {
          testDb.rollback(function (err, res) {
            cb(err, res);
          });
        }
        testDb.commit(function (err, res) {
          cb(err, res);
        });
      });
    });

  };
  updatePayment(payment, function (err, result) {
    if (err) {
      res.status(400);
      res.send('Update payment Failed!');
    }
    res.status(201);
    res.send('Update payment Successful!');
  });
});

//DELETE PAYMENT
router.delete('/', (req, res) => {
  deletePayment = function (userId, cb) {
    testDb.beginTransaction(function (err) {
      if (err) cb(err, null);

      testDb.query('delete from UtopiaAirline.CardDetails where userId = ?', [userId], function (err, res) {
        if (err) {
          testDb.rollback(function (err, res) {
            cb(err, res);
          });
        }
        testDb.commit(function (err, res) {
          cb(err, res);
        });
      });
    });
  };
  deletePayment(req.header('userId'), function (err, result) {
    if (err) {
      res.status(400);
      res.send('Delete payment Failed!');
    }
    if (result.length == 0) {
      const response = { message: `Payment doesn't exist` };
      res.status(404).send(response)
    }
    res.status(204).send('Delete payment Successful!');
  });
});


module.exports = router;