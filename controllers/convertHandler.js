function ConvertHandler() {
  
  this.unitArr = {
    gal: ['L', 3.78541, 'gallons'],
    L: ['gal', 1/3.78541, 'liters' ],
    mi: ['km', 1.60934, 'miles' ],
    km: ['mi', 1/1.60934, 'kilometers' ],
    lbs: ['kg', 0.453592, 'pounds'],
    kg: ['lbs', 1/0.453592, 'kilograms']
  }
  
  this.getNum = function(input) {
    let result;
    let regex = /(\d*(?:\.\d*)?)(\/)?(\d*(?:\.\d*)?)(.*)/;
    result = input.replace(regex, (_match, a, b, c, d) => {
      console.log(a,b,c,d);
      if (b === '/') {
        return Number(a)/Number(c)
      }
      return a;
    });
    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result;
    let regex = /(\d*(?:\.\d*)?)(\/)?(\d*(?:\.\d*)?)(.*)/;
    result = input.replace(regex, (_match, a, b, c, d) => d);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    result = this.unitArr[initUnit][0];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = this.unitArr[unit][2];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    let result = this.unitArr[initUnit][1] * initNum;
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
