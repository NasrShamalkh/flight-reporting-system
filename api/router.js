const router = require('express').Router();
const CustomerModel = require('../models/customer_model');
const RecordModel = require('../models/record_model');
const GuestModel = require('../models/guest_model');
const FlightModel = require('../models/flight_model');

router.get('/', (req, res) => {
  res.send('Backend server for reporting app');
});

router.post('/add_record', (req, res) => {
  const {
    customer_id,
    guests_ids,
    flight_id,
    from,
    to,
    extraBaggage,
    date,
    time,
    totalPayment
  } = req.body;
  const newRecord = new RecordModel({
    customer_id,
    guests_ids,
    flight_id,
    from,
    to,
    extraBaggage,
    date,
    time,
    totalPayment
  });
  newRecord
    .save()
    .then(() => {
      console.log(
        `New Record with _id ${newRecord._id} is saved to the database`
      );
      res.send(newRecord);
    })
    .catch(err => {
      console.log('Error in saving');
      res.send('Error in saving record');
    });
});

router.get('/get_records/:date', async (req, res) => {
  let { date } = req.params;
  let full_report_data = [];
  //first we find our record
  await RecordModel.find({ date })
    .then(async result => {
      //for each object (report), we have to find its full data and send it to the user
      for (var i = 0; i < result.length; i++) {
        var record_obj = {};
        record_obj.from = result[i].from;
        record_obj.to = result[i].to;
        record_obj.extraBaggage = result[i].extraBaggage;
        record_obj.date = result[i].date;
        record_obj.time = result[i].time;
        record_obj.totalPayment = result[i].totalPayment;
        // finding our customer
        await CustomerModel.findById(result[i].customer_id)
          .then(result => {
            console.log(`Customer found !,, id: ${result._id}`);
            record_obj.customer = result;
          })
          .catch(err => {
            console.log('Error in finding customer', err);
            res.send('Error in finding customer');
          });

        //finding flight
        await FlightModel.findById(result[i].flight_id)
          .then(async result => {
            console.log(`flight found !,, id: ${result._id}`);
            record_obj.flight = result;
          })
          .catch(err => {
            console.log('Error in finding flight', err);
            res.send('Error in finding flight');
          });
        //finding guest
        const findGuest = async _ => {
          let guestArr = [];
          for (var x = 0; x < result[i].guests_ids.length; x++) {
            console.log('any goddmaned thing');
            await GuestModel.findById(result[i].guests_ids[x])
              .then(async result => {
                guestArr.push(result);
                console.log('Found guest: ' + x);
              })
              .catch(err => {
                console.log('Error in finding guests', err);
                res.send('Error in finding guests');
              });
          }
          record_obj.guests = guestArr;
        };
        await findGuest();

        full_report_data.push(record_obj);
      }
      res.send(full_report_data);
    })
    .catch(err => {
      console.log('Error in getting records', err);
    });
});

// Database population routes
/////---------------- THESE ROUTES ARE FOR DATABASE POPULATION ONLY --------------////

//add a new customer
router.post('/add_customer', (req, res) => {
  const { firstName, lastName, email, gender, address, pymentInfo } = req.body;

  const newCustomer = new CustomerModel({
    firstName,
    lastName,
    email,
    gender,
    address,
    pymentInfo
  });
  newCustomer
    .save()
    .then(() => {
      console.log(`new customer with id of: ${newCustomer._id} is saved `);
      res.send(newCustomer);
    })
    .catch(err => {
      console.log('Error in saving customer: ', err);
      res.send('Error in saving customer');
    });
});

// add a new flight
router.post('/add_flight', (req, res) => {
  const { type, vehicle, pilot } = req.body;

  const newFlight = new FlightModel({
    type,
    vehicle,
    pilot
  });
  newFlight
    .save()
    .then(() => {
      console.log(`new flight with id of: ${newFlight._id} is saved`);
      res.send(newFlight);
    })
    .catch(err => {
      console.log('Error in saving flight to database', err);
      res.send('Error in saving flight to database');
    });
});

// save a new guest to database

router.post('/add_guest', (req, res) => {
  const { name, gender, email } = req.body;

  const newGuest = new GuestModel({
    name,
    gender,
    email
  });
  newGuest
    .save()
    .then(() => {
      console.log(`guest with id of: ${newGuest._id} is saved `);
      res.send(newGuest);
    })
    .catch(err => {
      console.log('Error in saving guest to database', err);
      res.send('Error in saving guest to databse');
    });
});

module.exports = router;
