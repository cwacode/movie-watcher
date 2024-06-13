import MoviePage from '../../frontend/src/views/MoviePage.vue';
import '../support/commands'

describe('MoviePage Component Tests', () => {
  const userId = 3; 
  const testMovieId = 1; 
  
  beforeEach(() => { 
    cy.mountWithAuth(MoviePage, userId);
    cy.intercept('POST', `/api/list/${userId}`, (req) => {
      expect(req.body).to.include({ movieId: testMovieId });
    }).as('addFavorite');
  });
  afterEach(() => {
    cy.removeFavorite(userId, testMovieId);
  });

  it('loads and displays all movies', () => {
      cy.get('.v-card').should('have.length', 20);
  });
  context('Sorting', () => {
    it('sorts movies by name', () => {
      cy.get('[data-cy="sort-name"]').click();
      cy.get('.v-card-title').first().should('contain', 'Avatar'); 
      cy.get('[data-cy="sort-name"]').click(); 
      cy.get('.v-card-title').first().should('contain', 'Titanic'); 
    });
    it('sorts movies by year', () => {
      cy.get('[data-cy="sort-year"]').click();
      cy.get('.v-card-title').first().should('contain', 'The Godfather'); 
      cy.get('[data-cy="sort-year"]').click(); 
      cy.get('.v-card-title').first().should('contain', 'Coco'); 
    });
    it('sorts movies by genre', () => {
      cy.get('[data-cy="sort-genre"]').click();
      cy.get('.v-card-title').first().should('contain', 'Gladiator'); 
      cy.get('[data-cy="sort-genre"]').click(); 
      cy.get('.v-card-title').first().should('contain', 'Saving Private Ryan'); 
    });
 });

 it('Adds a movie to favorites and verifies right status code and checks ui added response. -Removes it after', () => {
  cy.get('.v-card').first().find('[data-cy="add-to-favorites"]').as('firstFavoriteButton');
  cy.get('@firstFavoriteButton').click();
  cy.wait('@addFavorite').then((interception) => {
    expect(interception.response?.statusCode).to.eq(201);
    expect(interception.response?.body).to.have.property('user_id', userId);
    expect(interception.response?.body).to.have.property('movie_id', testMovieId);
  });
  cy.get('@firstFavoriteButton').should('contain', 'Added');
});
});
 

