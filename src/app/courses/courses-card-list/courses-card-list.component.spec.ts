import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import {CommonModule} from '@angular/common';


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;  // a component instance unique to each test
  let fixture: ComponentFixture<CoursesCardListComponent>;  // a test utility type that helps do some common test operations like
  // obtaining an instance of the component or debugging the component
  let el: DebugElement;  // important to be able to query the DOM

  beforeEach(waitForAsync(() => {  // waitForAsync waits 5 secs for the promise to resolve before running the it methods, so they can
    // get the values

    TestBed.configureTestingModule({
      imports: [
        CoursesModule, // The module where CoursesCardListComponent is declared
        CommonModule  // important module that makes important directives work like ngIf, ngFor, etc.
      ]
    }).compileComponents()  // going to get back a promise, that will get resolved when the compilation process is finished
      .then(() => {  // the then block is necessary to execute the code. The best practive is to initialize the variables in this block.

        fixture = TestBed.createComponent(CoursesCardListComponent);  // creating a component fixture
        component = fixture.componentInstance;  // grabbing an instance of the component itself.
        el = fixture.debugElement;
      });
  }) );


  it('should create the component', () => {

    expect(component).toBeTruthy('component is not truthy');

    /*pending();*/

  });


  it('should display the course list', () => {

    component.courses = setupCourses();

    fixture.detectChanges();  // to detect the changes above that updated the dom with the latest data

    /*console.log(`VISUALIZE COMPONENT => ${el.nativeElement.outerHTML}`);*/  // To visualize the html of the component for debug purpose

    const cards = el.queryAll(By.css('.course-card'));  // expect to receive a list of cards

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'unexpected number of courses cards');

    /*pending();*/

  });


  it('should display the first course', () => {

    component.courses = setupCourses();

    fixture.detectChanges();  // to detect the changes above that updated the dom with the latest data

    const firstCourse = component.courses[0];
    expect(firstCourse.titles.description).toEqual('Angular Testing Course');

    const firstCard = el.query(By.css('.course-card:first-child'));
    expect(firstCard).toBeTruthy('Could not find card');

    const titleFirstCard = el.query(By.css('mat-card-title'));
    expect(titleFirstCard.nativeElement.textContent).toBe(firstCourse.titles.description);

    const image = el.query(By.css('img'));
    expect(image.nativeElement.src).toBe(firstCourse.iconUrl);

    /*pending();*/

  });


});


