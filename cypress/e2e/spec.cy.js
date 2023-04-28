// Function to perform login
function performLogin() {
  const mailfield = "#loginID";
  const passw = "#password";

  cy.visit('localhost:3000');
  cy.get(mailfield).type("leendert.wienhofen@trondheim.kommune.no");
  cy.get(passw).type("defaultpassword");
  cy.get('button').click();
}

describe('Test navbar', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 1100);
  });

  before(() => {
    performLogin();
  });

  it('asserts equal navbar works', () => {
    cy.get('[data-testid="MenuIcon"]').click();
    // cy.url().should('eq', 'http://localhost:8000/users/1/edit');
  });
});

describe('Test frigjør lisens - Leendert', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 1100);
  });
  let app_name;
  before(() => {
    performLogin();
  });
    it('tester om en lisens kan forespørres frigjort', () => {
    cy.get('#cardTitle').click();
    cy.get('.PrivateSwitchBase-input').click()

    cy.get('table')
    .find('tbody tr:first-child')
    //.find('td:nth-child(2)')
        .find('th')
        .invoke('html')
       .then(innerHtml => {
          app_name = innerHtml;
        Cypress.env('app_name', innerHtml);
       });
    cy.get('table')
    .find('tr:first-child')
    .find('td:first-child')
    .find('button:first-child').click()
    // usikker på om dette er en grei måte å finne "forespør" knappen på".
    // ingen tillatelse?
    cy.get('.MuiButtonBase-root').eq(4).click();
  });
});

describe('Test min side - Leendert', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 1100);
  });
  before(() => {
    performLogin();
  });
  it('tester om lisensen som ble forespurt på er i listen over forespurte på min side', () => {
    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('a[href="/minside"]').click();

    cy.get('table')
        .first()
      .contains(Cypress.env('app_name'))
      .should('exist');
  });
});

// tester å skrive:
// forespørre lisens
//    dukker opp i listen over forespurte

// master kan godkjenne lisensforespørsler

// problemer
// kun tillatelse til å forespørre egne lisenser?
// lisenser som allerede er forespurt er ikke markert på en annen måte. derfor prøver jeg bare å forespørre en lisens, og sjekker kun om den finnes i listen over forespurte. ikke om det at man trykker gjør at den blir forespurt

