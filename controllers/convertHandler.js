function ConvertHandler() {
  
  this.unitArr = {
    gal: ['L', 3.78541, 'gallons', 'gal'],
    l: ['gal', 1/3.78541, 'liters', 'L'],
    mi: ['km', 1.60934, 'miles', 'mi'],
    km: ['mi', 1/1.60934, 'kilometers', 'km'],
    lbs: ['kg', 0.453592, 'pounds', 'lbs'],
    kg: ['lbs', 1/0.453592, 'kilograms', 'kg']
  }
  
  this.getNum = function(input) {
    let result;
    let regex = /(\d*(?:\.\d*)?)(\/?)(\d*(?:\.\d*)?)?([\W\d]*)(.*)/;

    result = input.replace(regex, (_match, a, b, c, d, e) => {
 
      if (d) {
        return undefined;
      } else if (b === '/') {
        return Number(a)/Number(c);
      } else if ( !(a || b || c || d) )  {
        return 1;
      }
      return a;
    });

    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result;
    let regex = /(\d*(?:\.\d*)?)(\/?)(\d*(?:\.\d*)?)?([\W\d]*)(.*)/;
    result = input.replace(regex, (_match, a, b, c, d, e) => e);
    if (this.unitArr[result.toLowerCase()] !== undefined) {
      return this.unitArr[result.toLowerCase()][3];
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = this.unitArr[initUnit.toLowerCase()][0];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = this.unitArr[unit.toLowerCase()][2];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    let result = this.unitArr[initUnit.toLowerCase()][1] * initNum;
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
  this.checkValid = function(initNum, initUnit) {
    if (initNum !== undefined && isFinite(initNum) && initUnit !== undefined ) {
      return;
    } else if (initNum !== undefined && isFinite(initNum) && initUnit === undefined ) {
      throw new Error ("invalid unit");
    } else if ((initNum === undefined || !isFinite(initNum)) && initUnit !== undefined) {
      throw new Error ("invalid number");
    } else {
      throw new Error ("invalid number and unit");
    }
  }
}

module.exports = ConvertHandler;
