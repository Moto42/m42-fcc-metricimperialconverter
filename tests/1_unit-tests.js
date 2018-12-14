/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      var output = convertHandler.getNum(input);
      assert.equal(output,32);
      assert.isNumber(output);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '.32L';
      var output = convertHandler.getNum(input);
      assert.equal(output,.32);
      assert.isNumber(output);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/4L';
      var output = convertHandler.getNum(input);
      assert.equal(output,1/4);
      assert.isNumber(output);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '2.5/6L';
      var output = convertHandler.getNum(input);
      assert.equal(output,2.5/6);
      assert.isNumber(output);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '1/2/13L';
      var output = convertHandler.getNum(input);
      assert.equal(output,'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      var output = convertHandler.getNum(input);
      assert.equal(output,1);
      assert.isNumber(output);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
   
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        var unit  = `5${ele}`;
        var output = convertHandler.getUnit(unit);
        assert.equal(output,ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = '3hogshead';
      var output = convertHandler.getUnit(input);
      assert.equal(output,"invalid unit");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal', 'l' ,'mi','km','lbs','kg' ];
      var expect = ['L' ,'gal','Km','mi','Kg' ,'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    var input = [ 'gal',     'l',      'mi',    'km',         'lbs',    'kg' ];
    var expect= [ 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms' ]
    test('For Each Valid Unit Inputs', function(done) {
      input.forEach( (unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), expect[i]);
      } );
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.3208;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.2679;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'km'];
      var expected = 3.1068;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});