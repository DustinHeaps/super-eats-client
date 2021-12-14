describe('Register', () => {

  it('should see email / password validation errors', () => {
    cy.visit('/');
    // cy.findByText(/create an account/i)
    cy.findByText(/create an account/i).click();
    cy.findByPlaceholderText(/email/i).type('wromvcdvail').blur();
    cy.findByRole('alert').should('have.text', 'Please enter valid email address');
    cy.findByPlaceholderText(/email/i).clear().blur();
    cy.findByLabelText('required').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('right@gmail.com');
    cy
      .findByPlaceholderText(/password/i)
      .type('a')
      .clear().blur();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });

  it('should be able to create account and login', () => {
    cy.intercept('http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === 'createAccountMutation') {
        req.reply((res) => {
          res.send({ fuxture: 'auth/register.json' });
        });
      }
    });
    cy.visit('/register');
    cy.findByPlaceholderText(/email/i).type('right123@gmail.com');
    cy.findByPlaceholderText(/password/i).type('1234').blur();
    cy.findByRole('button').click();

    cy.wait(1000);

    // @ts-ignore
    cy.login('right123@gmail.com', '1234');
  });

  // End of create-account.ts
});