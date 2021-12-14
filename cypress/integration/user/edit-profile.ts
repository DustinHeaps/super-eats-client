describe('Edit Profile', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login('right@gmail.com', '1234');
  });

  it('can go to /edit-profile using the header', () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.wait(2000);
    cy.title().should('eq', 'Edit Profile | Super Eats');
  });

  it('can change email', () => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'editProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'left@gmail.com';
      }
    });
    cy.visit('/edit-profile');
    cy.findByPlaceholderText(/email/i).clear().type('right@gmail.com');
    cy.findByRole('button').click();
  });
});
