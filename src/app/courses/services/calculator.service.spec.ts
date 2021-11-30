import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

/*USE NG TEST ON THE TERMINAL TO TEST.*/
describe('CalculatorService', () => {

  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {

    console.log('Calling before each');

    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);  // a fake method / dependency, to isolate the test only to the
    // CalculatorService, and not to its dependencies. It's a fake implementation of the LoggerService.

    /*logger.log.and.returnValue();*/  // If the logger.log returned some value, we could use this function to return something.

    /*The TestBed utility allow us to provide the dependency using dependency injection instead of calling the constructors
     explicitly*/
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });
    calculator = TestBed.inject(CalculatorService);
  });


  it('should add two numbers', () => {

    console.log('add test');

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1); // keep track of the number of times the function is called, and check if the
    // expectation is correct.
  });


  it('subtract two numbers', () => {

    console.log('subtract test');

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, 'unexpected subtraction result'); // You can add this string to better understand the test result in the browser

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    /*pending();*/
  });


});
