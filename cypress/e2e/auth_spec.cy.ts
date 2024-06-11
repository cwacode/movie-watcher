describe('Login Functionality', () => {
  it('successfully logs in an user', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get('[data-cy=email-input]').type('user@example.com');
    cy.get('[data-cy=password-input]').type('password123{enter}');
    cy.url().should('include', '/dashboard');
  });

  it('shows an error message on failed login', () => {
    cy.visit('/');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('wrongpassword{enter}');
  });
});
