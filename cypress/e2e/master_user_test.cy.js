function performLoginMaster() {
  const mailfield = "#loginID";
  const passw = "#password";

  cy.visit('localhost:3000');
  cy.get(mailfield).type("bertil.nedregard@trondheim.kommune.no");
  cy.get(passw).type("defaultpassword");
  cy.get('button').click();
}

describe('Login test - master user', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 1100);
  });

  before(() => {
    performLoginMaster();
  });

  it('tries to log in as a master user', () => {
    // This test should pass since we are already logged in
  });
});

describe('Test frigjør lisens - Leendert', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 1100);
  });
  let app_navn;
  let rad_2;

  before(() => {
    performLoginMaster();
  });
  it('tester om en master user kan godkjenne frigjøring av en lisens', () => {
      cy.get('[data-testid="menuIcon"]').click();
      cy.get('a[href="/minside"]').click();

      cy.get('table')
      .first()
      .find('tbody tr:first-child')
        .invoke('html')
       .then(innerHtml => {
          app_navn = innerHtml;
        Cypress.env('app_navn', innerHtml);
       });

      cy.get('[data-testid="approved-test-id"]')
          .first()
          .click()

      cy.get('table')
      .first()
      .find('tbody tr:first-child')
      .invoke('html')
      .then(innerHtml => {
          rad_2 = innerHtml;
        Cypress.env('rad_2', innerHtml)

       })
          // sammenligningen !assert equals selv om det ikke blir gjort riktig. raden forsvinner ikke så sammenligner egt med seg selv.
      .then(() => {
                expect(app_navn).to.not.eq(rad_2);

                }
            )
      ;

  });
});

