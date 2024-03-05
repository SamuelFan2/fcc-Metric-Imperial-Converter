const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   
  
    // #1
    test('convertHandler should correctly read a whole number input', () => {
      // #1

      assert.strictEqual(123, convertHandler.getNum("123gal"), `expect 123 is equal to ${convertHandler.getNum("123gal")}`);
      assert.strictEqual(85, convertHandler.getNum("85L"), `expect 85 is equal to ${convertHandler.getNum("85L")}`);
      assert.strictEqual(327, convertHandler.getNum("327lbs"), `expect 327 is equal to ${convertHandler.getNum("327lbs")}`);
    })


    // #2
    test('convertHandler should correctly read a decimal number input', () => {
   
        assert.strictEqual(123.58, convertHandler.getNum("123.58gal"), `expect 123.58 is equal to ${convertHandler.getNum("123.58gal")}`);
        assert.strictEqual(978.66, convertHandler.getNum("978.66mi"), `expect 978.66 is equal to ${convertHandler.getNum("978.66mi")}`);
        assert.strictEqual(9.8, convertHandler.getNum("9.8kg"), `expect 9.8kg is equal to ${convertHandler.getNum("9.8kg")}`);
        
    })

    // #3
    test('convertHandler should correctly read a fractional input', () => {
  
        assert.strictEqual(0.6666666666666666, convertHandler.getNum("2/3gal"), `expect 0.6666666666666666 is equal to ${convertHandler.getNum("2/3gal")}`);
        assert.strictEqual(1.125 , convertHandler.getNum("9/8km"), `expect 1.125 is equal to ${convertHandler.getNum("9/8km")}`);
        assert.strictEqual(0.3564356435643564 , convertHandler.getNum("36/101lbs"), `expect 0.3564356435643564 is equal to ${convertHandler.getNum("36/101lbs")}`);
    })

    // #4
    test('convertHandler should correctly read a fractional input with a decimal', () => {
  
        assert.strictEqual(0.21428571428571427 , convertHandler.getNum("1.5/7gal"), `expect 0.21428571428571427 is equal to ${convertHandler.getNum("1.5/7gal")}`);
        assert.strictEqual(2.173913043478261 , convertHandler.getNum("5/2.3km"), `expect 2.173913043478261 is equal to ${convertHandler.getNum("5/2.3km")}`);
        assert.strictEqual(1.525 , convertHandler.getNum("6.1/4L"), `expect 1.525 is equal to ${convertHandler.getNum("6.1/4L")}`);
        
        
    })

    let check = (n) => convertHandler.checkValid(convertHandler.getNum(n),convertHandler.getUnit(n));

    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
        
        assert.throws(() => check('8/2/52gal'),'invalid number');
        assert.throws(() => check('3/5/2gal'),'invalid number');
        
    })

    // #6
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
  
        assert.strictEqual(1, convertHandler.getNum("mi"),`expect 1 is equal to ${convertHandler.getNum("mi")}`);
        assert.strictEqual(1, convertHandler.getNum("kg"),`expect 1 is equal to ${convertHandler.getNum("kg")}`);
        assert.strictEqual(1, convertHandler.getNum("L"),`expect 1 is equal to ${convertHandler.getNum("L")}`);
        
    })

    // #7
    test("convertHandler should correctly read each valid input unit", () => {

        assert.strictEqual('gal', convertHandler.getUnit("123gal"), `expect gal is equal to ${convertHandler.getUnit("123gal")}`);
        assert.strictEqual('L', convertHandler.getUnit("85L"), `expect L is equal to ${convertHandler.getUnit("85L")}`);
        assert.strictEqual('lbs', convertHandler.getUnit("327lbs"), `expect lbs is equal to ${convertHandler.getUnit("327lbs")}`);
        assert.strictEqual('kg', convertHandler.getUnit("123kg"), `expect kg is equal to ${convertHandler.getUnit("123kg")}`);
        assert.strictEqual('mi', convertHandler.getUnit("85mi"), `expect mi is equal to ${convertHandler.getUnit("85mi")}`);
        assert.strictEqual('km', convertHandler.getUnit("327km"), `expect km is equal to ${convertHandler.getUnit("327km")}`);

    })

    // #8
    test("convertHandler should correctly return an error for an invalid input unit", () => {

        assert.throws(() => check('3/9gall'),'invalid unit');
        assert.throws(() => check('4/1min'),'invalid unit');
        assert.throws(() => check('3.6lb'),'invalid unit');

    })

    // #9
    test("convertHandler should return the correct return unit for each valid input unit", () => {

        assert.strictEqual('mi', convertHandler.getReturnUnit("km"), `expect mi is equal to ${convertHandler.getReturnUnit("km")}`);
        assert.strictEqual('km', convertHandler.getReturnUnit("mi"), `expect km is equal to ${convertHandler.getReturnUnit("mi")}`);
        assert.strictEqual('L', convertHandler.getReturnUnit("gal"), `expect L is equal to ${convertHandler.getReturnUnit("gal")}`);
        assert.strictEqual('gal', convertHandler.getReturnUnit("L"), `expect gal is equal to ${convertHandler.getReturnUnit("L")}`);
        assert.strictEqual('lbs', convertHandler.getReturnUnit("kg"), `expect lbs is equal to ${convertHandler.getReturnUnit("kg")}`);
        assert.strictEqual('kg', convertHandler.getReturnUnit("lbs"), `expect kg is equal to ${convertHandler.getReturnUnit("lbs")}`);
       
    })

    // #10
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {

        assert.strictEqual('miles', convertHandler.spellOutUnit("mi"), `expect miles is equal to ${convertHandler.spellOutUnit("mi")}`);
        assert.strictEqual('kilometers', convertHandler.spellOutUnit("km"), `expect kilometers is equal to ${convertHandler.spellOutUnit("km")}`);
        assert.strictEqual('liters', convertHandler.spellOutUnit("L"), `expect liters is equal to ${convertHandler.spellOutUnit("L")}`);
        assert.strictEqual('gallons', convertHandler.spellOutUnit("gal"), `expect gallons is equal to ${convertHandler.spellOutUnit("gal")}`);
        assert.strictEqual('pounds', convertHandler.spellOutUnit("lbs"), `expect pounds is equal to ${convertHandler.spellOutUnit("lbs")}`);
        assert.strictEqual('kilograms', convertHandler.spellOutUnit("kg"), `expect kilograms is equal to ${convertHandler.spellOutUnit("kg")}`);
       
    })

    const result = (n) => Number(convertHandler.convert(convertHandler.getNum(n),convertHandler.getUnit(n))); 

    // #11
    test("convertHandler should correctly convert gal to L", () => {

        assert.strictEqual(3.78541, result('1gal'), `expect 3.78541 is equal to ${result('1gal')}`);
        assert.strictEqual(37.85410, result('10gal'), `expect 37.85410 is equal to ${result('10gal')}`);
        

    })

    // #12
    test("convertHandler should correctly convert L to gal", () => {

        assert.strictEqual(0.26417, result('1L'), `expect 0.26417 is equal to ${result('1L')}`);
        assert.strictEqual(2.64172, result('10L'), `expect 2.64172 is equal to ${result('10L')}`);

    })

    // #13
    test("convertHandler should correctly convert mi to km", () => {

        assert.strictEqual(1.60934, result('1mi'), `expect 1.60934 is equal to ${result('1mi')}`);
        assert.strictEqual(16.09340, result('10mi'), `expect 16.09340 is equal to ${result('10mi')}`);

    })

    // #14
    test("convertHandler should correctly convert km to mi", () => {

        assert.strictEqual(0.62137, result('1km'), `expect 0.62137 is equal to ${result('1km')}`);
        assert.strictEqual(6.21373, result('10km'), `expect 6.21373 is equal to ${result('10km')}`);

    })

    // #15
    test("convertHandler should correctly convert lbs to kg", () => {

        assert.strictEqual(0.45359, result('1lbs'), `expect 0.45359 is equal to ${result('1lbs')}`);
        assert.strictEqual(4.53592, result('10lbs'), `expect 4.53592 is equal to ${result('10lbs')}`);

    })

    // #16
    test("convertHandler should correctly convert kg to lbs", () => {

        assert.strictEqual(2.20462, result('1kg'), `expect2.20462 is equal to ${result('1kg')}`);
        assert.strictEqual(22.04624, result('10kg'), `expect 22.04624 is equal to ${result('10kg')}`);

    })
});