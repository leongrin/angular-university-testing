import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';

/*USE NG TEST ON THE TERMINAL TO TEST.*/
describe('CalculatorService', () => {

  it('should add two numbers', () => {

    const logger = jasmine.createSpyObj('LoggerService', ['log']);  // a fake method / dependency, to isolate the test only to the
    // CalculatorService, and not to its dependencies. It's a fake implementation of the LoggerService.

    /*logger.log.and.returnValue();*/  // If the logger.log returned some value, we could use this function to return something.

    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(logger.log).toHaveBeenCalledTimes(1); // keep track of the number of times the function is called, and check if the
    // expectation is correct.
  });


  it('subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, 'unexpected subtraction result'); // You can add this string to better understand the test result in the browser

    /*pending();*/
  });


});
