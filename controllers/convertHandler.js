/*
*
*
*       Complete the handler logic below
*       
*       
*/


// ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']

function ConvertHandler() {

  const regy = /(?=[glmkLGMK])/;
  
  this.doubleFractionCheck = function(str){
    var slashes = str.match( /\//g );
    if (slashes === null || slashes.length === 1) return false;
    else return true;
    
  };
  
  this.getNum = function(input) {
    var splitHere = input.search(regy);
    var result = input.slice(0,splitHere);
    if(result === "") return 1;
    if(this.doubleFractionCheck(input)) return 'invalid number';
    return eval(result);
  };
  
  this.getUnit = function(input) {
    var splitHere = input.search(regy);
    var result = input.slice(splitHere);
    if( ['gal','l','mi','km','lbs','kg'].indexOf(result.toLowerCase() )>-1) return result;
    else return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    
    switch(initUnit.toLowerCase()){
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'Kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'Km';
        break;
      case 'km':
        result = 'mi';
        break;
      default  :
        result = 'invalid unit';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    switch(unit.toLowerCase()){
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = "pounds";
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch(initUnit.toLowerCase()){
      case 'gal':
        result = initNum*galToL;
        break;
      case 'lbs':
        result = initNum*lbsToKg;
        break;
      case 'mi' :
        result = initNum*miToKm;
        break;
      case 'l'  :
        result = initNum/galToL;
        break;
      case 'kg' :
        result = initNum/lbsToKg;
        break;
      case 'km' :
        result = initNum/miToKm;
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const fullInitUnit  = this.spellOutUnit(initUnit);
    const fullReturnUnit = this.spellOutUnit(returnUnit);
    var result = `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
