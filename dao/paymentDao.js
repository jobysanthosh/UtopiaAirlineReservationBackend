var db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getPayment = function(cb){
    db.query('select * from UtopiaAirline.CardDetails', function(err, result) {
        cb(err, result);
      });
};

exports.getOnePayment = function(userId, cb){
    db.query('select * from UtopiaAirline.CardDetails where userId = ?',  [userId], function(err, result) {
        cb(err, result);
      });
};

exports.createPayment = function(payment, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);

        bcrypt.hash(payment.cardNumber, saltRounds, function(err, hash) {
        
            db.query('INSERT INTO UtopiaAirline.CardDetails(userId,cardNumber,cardType,expirationDate,nameOnCard) VALUES(?,?,?,?,?)', [payment.userId,hash, payment.cardType, payment.expirationDate, payment.nameOnCard], function(err, res){
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
      });
};

exports.updatePayment = function(payment, cb){
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

  exports.deletePayment = function(userId, cb){
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
}