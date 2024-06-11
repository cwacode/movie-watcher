describe('Authentication Tests', () => {
  context('Login', () => {
    it('Should log in with valid credentials', () => {
      cy.visit('/login');
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('testpassword');
      cy.get('form').submit();
      cy.url().should('include', '/movies');
    });

    it('Should fail to log in with incorrect credentials', () => {
      cy.visit('/login');
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('wrongPassword');
      cy.get('form').submit();
      cy.contains('error').should('be.visible');
    });
  });

  context('Registration', () => {
    it('Should navigate to registration and register a new user successfully', () => {
      cy.visit('/login');
      cy.contains('Go to Register').click();
      cy.get('[data-cy="Username"]').type(`user_${Date.now()}`);
      cy.get('[data-cy="Password"]').type('securePassword');
      cy.get('form').submit();
      cy.contains('Successfully registered').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('Should fail to register with existing username', () => {
      cy.visit('/login');
      cy.contains('Go to Register').click();
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('testpassword');
      cy.get('form').submit();
      cy.contains('Username already taken').should('be.visible');
    });
  });
});
