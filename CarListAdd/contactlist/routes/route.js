const express = require('express');
const router = express.Router();
const carschema = require('../models/carListSchema')
var multer = require('multer');
const fs = require('fs')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var uploads = multer({ storage: storage })


//Save Task
router.post('/listCreated', uploads.single('img'), function (req, res) {

  console.log("fssfggf", req.file)
  // var data = ;
  console.log(req.files)
  const newcarschema = new carschema({
    Username: req.body.username,
    Carname: req.body.carname,
    Model: req.body.modal,
    DrivingLicences: req.body.drivingLic,
    img: req.file.path,
    phone: req.body.phone,
    ActiveStatus: req.body.activeStatus,


  });

  newcarschema.save((err, contact) => {
    if (err) {
      res.json((msg = 'failed to add contact'));
    }
    else {
      res.json((msg = 'success to add contact'));
    }
  });


})
  ;
router.get('/tasks', function (req, res, next) {
  carschema.findOne({ Username: req.body.username }, function (err, tasks) {
    if (err) {
      res.send(err);
    } else {

      console.log(tasks, JSON.stringify(tasks.img))
      fs.readFile(tasks.img, (err, data) => {
        var obj = {
          list: tasks,

          fileImg: data

        }
        console.log(obj)
        res.send(obj)

      })
    }

  });

});



router.get('/getAllActiveList', function (req, res, next) {
  carschema.findOne({ ActiveStatus: "yes" }, function (err, tasks) {
    if (err) {
      res.send(err);
    } else {
      res.send(tasks)
    }

  });
});


router.post('/updateCarList', uploads.single('img'), function (req, res, next) {



  carschema.deleteOne({ Username: req.body.username }, function (err, task) {
    if (err) {
      res.send(err);
    } else {

      const newcarschema = new carschema({
        Username: req.body.username,
        Carname: req.body.carname,
        Model: req.body.modal,
        DrivingLicences: req.body.drivingLic,
        img: req.file.path,
        phone: req.body.phone,
        ActiveStatus: req.body.activeStatus,

      });
      newcarschema.save(function (err, task) {
        if (err) {
          res.json((msg = 'failed to add list'));
        }
        else {
          res.json((msg = 'success to add list'));
        }

      });

    }

  })
})





module.exports = router;