import StartPage from '../../frontend/src/views/StartPage.vue';
import '../support/commands';

describe('StartPage Component Tests', () => {
  beforeEach(() => {
    cy.mountWithAuth(StartPage);
    cy.intercept('POST', '/api/auth/register', (req) => {
      if (req.body.username === "testuser") {
        req.reply(409, { message: "Username already taken" });
      } else if (req.body.username && req.body.password) {
        req.reply(201, { message: "Successfully registered", userId: Date.now() });
      } else {
        req.reply(400, { message: "Bad request" });
      }
    }).as('registerRequest');

    cy.intercept('POST', '/api/auth/login', (req) => {
      if (req.body.username === "testuser" && req.body.password === "testpassword") {
        req.reply(200, { message: "Login successful", userId: 123, username: "testuser" });
      } else {
        req.reply(401, { message: "Invalid credentials" });
      }
    }).as('loginRequest');
  });

  context('Registration', () => {
    it('Should fail to register with existing username', () => {
      cy.get('[data-cy="Title"]').should('contain', 'Register')
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('testpassword');
      cy.get('[data-cy="Submit"]').contains('Register').click();
      cy.contains('Username already taken').should('be.visible');
    });
    it('Should register a new user successfully', () => {
      cy.get('[data-cy="Title"]').should('contain', 'Register')
      cy.get('[data-cy="Username"]').type(`user_${Date.now()}`);
      cy.get('[data-cy="Password"]').type('securePassword');
      cy.get('[data-cy="Submit"]').contains('Register').click();
      cy.contains('Successfully registered').should('be.visible');
      cy.wait('@registerRequest');
      cy.url().should('include', '/login');
    });
  });

  context('Login', () => {
    it('Header should not be visible without login', () => {
      cy.get('.header-component').should('not.exist');
    });
    it('Should fail to log in with incorrect credentials', () => {
      cy.get('[data-cy="Title"]').should('contain', 'Login')
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('wrongPassword');
      cy.get('[data-cy="Submit"]').contains('Log in').click();
      cy.contains('Invalid credentials').should('be.visible');
    });
    it('Should successfully log in with valid credentials', () => {
      cy.get('[data-cy="Title"]').should('contain', 'Login')
      cy.get('[data-cy="Username"]').type('testuser');
      cy.get('[data-cy="Password"]').type('testpassword');
      cy.get('[data-cy="Submit"]').contains('Log in').click();
      cy.wait('@loginRequest');
      cy.url().should('include', '/movies');
    });
  });
});