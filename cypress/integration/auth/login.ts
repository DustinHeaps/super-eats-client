describe('Login', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login | Super Eats');
  });

  it('can see email / password validation errors', () => {
    cy.visit('/');
    cy.findByPlaceholderText(/email/i).type('wroemail').blur();
    cy.findByRole('alert').should('have.text', 'Please enter a valid email address');
    cy.findByPlaceholderText(/email/i).clear().blur();
    cy.findByLabelText('required').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('wrong@email.com');
    cy.findByPlaceholderText(/password/i)
      .type('123456')
      .clear()
      .blur();
    cy.findByLabelText('required').should('have.text', 'Password is required');
  });

  it('can fill out the form and login', () => {
    // @ts-ignore
    cy.login('right@gmail.com', '1234');

    cy.window().its('localStorage.token').should('be.a', 'string');
  });
});
