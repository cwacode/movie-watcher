import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('http://localhost:5173/login');
});

When('I enter valid credentials', () => {
  cy.get('[data-cy="Username"]').type('testuser');
  cy.get('[data-cy="Password"]').type('testpassword');
});

When('I enter incorrect credentials', () => {
  cy.get('[data-cy="Username"]').type('testuser');
  cy.get('[data-cy="Password"]').type('wrongPassword');
});

When('I submit the form', () => {
  cy.get('form').submit();
});

Then('I should be redirected to the movies page', () => {
  cy.url().should('include', '/movies');
});

Then('an error message should be visible', () => {
  cy.contains('error').should('be.visible');
});

When('I navigate to the registration page', () => {
  cy.contains('Go to Register').click();
});

When('I register with a new user\'s credentials', () => {
  cy.get('[data-cy="Username"]').type(`user_${Date.now()}`);
  cy.get('[data-cy="Password"]').type('securePassword');
  cy.get('form').submit();
});

Then('I should see a success message and be redirected to the login page', () => {
  cy.contains('Successfully registered').should('be.visible');
  cy.url().should('include', '/login');
});

When('I try to register with an existing username', () => {
  cy.get('[data-cy="Username"]').type('testuser');
  cy.get('[data-cy="Password"]').type('testpassword');
  cy.get('form').submit();
});

Then('I should see a message that the username is already taken', () => {
  cy.contains('Username already taken').should('be.visible');
});
