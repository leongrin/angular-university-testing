

describe('Home Page', () => {



  beforeEach(() => {

    cy.fixture('courses.json').as('coursesJSON');  // mocking the http response of the application and giving an
    // alias to it. courses.json file contains a simulated response of the http request.

    cy.server(); // Initialize cypress mock backend server

    cy.route('/api/courses', '@coursesJSON').as('courses');  // link the url of the api request to its response,
    // using the @ sign before its alias, to access the payload. After that we gave the name/alias courses, meaning
    // that the courses are available to the front end to display.

    cy.visit('/');

  });



  it('should display a list of courses', () => {

    cy.contains('All Courses');

    cy.wait('@courses'); // Wait for the courses event to finish.

    cy.get('mat-card').should('have.length', 9);  // test assertion

  });


  it('should display the advanced courses', function () {

    cy.get('.mat-tab-label').should('have.length', 2);  // test assertion that there are 2 tabs

    cy.get('.mat-tab-label').last().click();  // clicking the last element, which is the advanced courses tab

    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);  // test assertion of cards
    // list to greater than 1

    cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course');  // test
    // assertion that the first card contain 'Angular Security Course'

  });

});


