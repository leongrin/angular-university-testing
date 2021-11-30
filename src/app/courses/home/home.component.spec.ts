import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';


describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesServ: any;
  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');
  const allCourses = setupCourses();

  beforeEach(waitForAsync(() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']); // findAllCourses is the only method used by
    // this component

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule  // to test this component without the animation, to avoid breaking the component. Another alternative would
        // be to import the BrowserAnimationsModule here
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy }  // to use a fake service not to make http requests
      ]
    }).compileComponents()  // going to get back a promise, that will get resolved when the compilation process is finished
      .then(() => {  // the then block is necessary to execute the code. The best practice is to initialize the variables in this block.

        fixture = TestBed.createComponent(HomeComponent);  // creating a component fixture
        component = fixture.componentInstance;  // grabbing an instance of the component itself.
        el = fixture.debugElement;
        coursesServ = TestBed.inject(CoursesService);
      });

  }) );



  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  it('should display only beginner courses', () => {

    coursesServ.findAllCourses.and.returnValue(of(beginnerCourses));  // Even though the findAllCourses method is async, it is returning
    // value from the setupCourses method, which is a sync operation, even though we transformed it into an observable using the of method.

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');  // only the beginner courses observable will be emitting some
    // value, so the ngIf will load only the beginner courses tab.

    /*pending();*/

  });


  it('should display only advanced courses', () => {

    coursesServ.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');

    /*pending();*/

  });


  it('should display both tabs', () => {

    coursesServ.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(2, 'Unexpected number of tabs found');

    /*pending();*/

  });


  it('should display advanced courses when tab clicked', (done) => {

    coursesServ.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    /*el.nativeElement.click(tabs[1]);*/  // alternative to the click method below
    click(tabs[1]);  // to simplify the code, we are using this click utility from the address /common/test-utils

    console.log(`tabs[0] => ${tabs[0].nativeElement.textContent}`);
    console.log(`tabs[1] => ${tabs[1].nativeElement.textContent}`);

    fixture.detectChanges();  // updating the content of the DOM

    setTimeout(() => {

      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0, 'no card titles found');

      console.log(`first card title => ${cardTitles[0].nativeElement.textContent}`);

      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security', 'first card does not contain security');

      done();

    }, 2000);

    /*pending();*/

  });

});


