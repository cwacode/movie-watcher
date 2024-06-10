import Header from '../../frontend/src/components/Header.vue';

describe('Header Component', () => {
  beforeEach(() => {
    cy.mount(Header);
  });

  it('should display the header with links to MoviePage and UserPage', () => {
    cy.get('a').contains('Movies').should('be.visible');
    cy.get('a').contains('User page').should('be.visible');
  });

  it('should navigate to the movies page on click', () => {
    cy.get('a').contains('Movies').click();
    cy.wait(500);
    cy.url().should('include', '/movies');
  });

  it('should navigate to the users page on click', () => {
    cy.get('a').contains('User page').click();
    cy.wait(500);
    cy.url().should('include', '/users');
  });
});
