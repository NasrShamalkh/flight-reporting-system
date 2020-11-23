//requiring express framework (build server), bodyParse (handle JSON data), cors(handle cros-site requests)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// our routers
const router = require('./router.js');

//declaring our app
const app = express();

//app needs to use the cors policy, bodyParser and / or (for some users) (express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connecting our database
mongoose
  .connect('mongodb://localhost/vetifly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected successfully !'))
  .catch(err => console.log('Error in database connection, ', err));

//using our routers
app.use('/', router);

//defining the PORT and luanching our application
const PORT = 5600;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
