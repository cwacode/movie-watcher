import UserPage from '../../frontend/src/views/UserPage.vue';
import '../support/commands';

describe('UserPage Component Tests with Real Data', () => {
  const userId = 3;
  const testMovieId = 2;
  const movieTitle = 'The Matrix';
  
  beforeEach(() => {
    cy.mountWithAuth(UserPage, userId);
    cy.intercept('DELETE', `/api/list/${userId}/${testMovieId}`).as('removeFavorite');
  });

  afterEach(() => {
    cy.addFavorite(userId, testMovieId);
  });

  it('displays favorite movies after fetching them', () => {
    cy.get('.v-card').should('have.length.at.least', 1);
  });

  it('removes a movie from favorites and verifies the list update', () => {
    cy.get('.v-card').its('length').then((initialCount) => {
      cy.get('.v-card').contains(movieTitle).parents('.v-card').find('[data-cy="Delete"]').click();
      cy.wait('@removeFavorite').then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.message).to.eq('Movie removed from list successfully');
      });
      cy.get('.v-card').should('have.length', initialCount - 1);
      cy.get('.v-card-title').each(($el) => {
        expect($el.text()).not.to.contain(movieTitle);
      });
    });
  });

  it('logs out the user and verifies redirection', () => {
    cy.get('[data-cy="Logout"]').click();
    cy.url().should('include', '/login');
  });
});
