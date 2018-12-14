'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var ConvertHandler = require('./controllers/convertHandler');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');
const helmet          = require('helmet');

var app = express();




app.use(helmet.noSniff());
// app.use(helmet.xssFilter());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)

const convertHandler = new ConvertHandler();


app.route('/api/convert')
  .get(
    (req,res) => {
      const input = req.query.input;
      const initNum    = convertHandler.getNum(input);
      const initUnit   = convertHandler.getUnit(input);
      const returnNum  = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
      
      var response ={
        input      :  input,
        initNum    :  initNum,
        initUnit   :  initUnit,
        returnNum  :  returnNum,
        returnUnit :  returnUnit,
        string     :  returnString,
      }
      if(initNum  === 'invalid number') {
        response = 'invalid number';
      }
      if(initUnit === 'invalid unit')   {
        response = 'invalid unit';
      }
      if(
        initNum   === 'invalid number' &&
        initUnit  === 'invalid unit'
      )                                 {
        response = 'invalid number and unit'
      };
    res.json(response);
});
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
