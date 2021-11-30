/*f at the beginning to focus on running only this test => fdescribe*/
import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';

fdescribe('async testing examples', () => {


  it('Asynchronous test example with jasmine done() ', (done) => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();

    }, 1000);

  });


  /*The fakeAsync zone detects all asynchronous operations*/
  it('Asynchronous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions');
      test = true;

    }, 1000);

    /*tick(500);*/ // it is less time than the 1000 from the setTimeout, so our assertion is not executed
    /*tick(499);*/  // tick controls the passage of time
    /*tick(1);*/ // after advancing the time to 1000, the assertions are executed

    flush(); // Instead of using tick, we can use flush that automatically waits for all async operations to complete before running the
    // assertions.

    expect(test).toBeTruthy();  // with fakeAsync, we don't need to run our assertions inside nested code blocks, which is one advantage
    // over the done alternative.

  }));


  /*using the fit utility to focus only on this test*/
  it('Asynchronous test example - plain promise', fakeAsync(() => {

    let test = false;
    console.log('Creating promise');

    Promise.resolve().then(() => {

      console.log('Promise first then() evaluated successfully');
      test = true;

      return Promise.resolve();

    }).then(() => {

      console.log('Promise second then() evaluated successfully');

    });

    flushMicrotasks(); // Microtests are promises, which have priority (run faster) over tasks like setTimeout for example.

    console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));



  fit('Asynchronous test example - Promises + setTimeout()', fakeAsync (() => {

    let counter = 0;

    Promise.resolve().then(() => {

      counter += 10;

      setTimeout(() => {

        counter += 1;

      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks(); // flushing promises only

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);




  }));


});


