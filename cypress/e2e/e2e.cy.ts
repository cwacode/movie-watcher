describe('Complete User Journey Tests', () => {
    
    it('Login page should not show header', () => {
        cy.visit('http://localhost:5173/login');
        cy.get('header').should('not.exist');
    });

    it('User logs in and is redirected to the movies page', () => {
        cy.get('[data-cy="Username"]').type('testuser');
        cy.get('[data-cy="Password"]').type('testpassword');
        cy.get('[data-cy="Submit"]').click();
        cy.url().should('include', '/movies');
        cy.get('header').should('be.visible');
    });

    it('User can sort movies by name, year, and genre', () => {
        cy.get('[data-cy="sort-name"]').click().wait(500).click();
        cy.get('.v-card-title').first().should('contain', 'Titanic'); 
        cy.get('[data-cy="sort-year"]').click().wait(500).click();
        cy.get('.v-card-title').first().should('contain', 'Coco'); 
        cy.get('[data-cy="sort-genre"]').click().wait(500).click();
        cy.get('.v-card-title').first().should('contain', 'Saving Private Ryan');
    });

    it('User adds two movies to favorites and checks for confirmation', () => {
        cy.get('[data-cy="add-to-favorites"]').first().click();
        cy.get('[data-cy="add-to-favorites"]').eq(1).click();
        cy.get('[data-cy="add-to-favorites"]').eq(2).click();
        cy.get('[data-cy="add-to-favorites"]').first().should('contain', 'Added');
        cy.get('[data-cy="add-to-favorites"]').eq(1).should('contain', 'Added');
        cy.get('[data-cy="add-to-favorites"]').eq(2).should('contain', 'Added');
    });

    it('User navigates to User Page and sees favorites', () => {
        cy.get('a').contains('User page').click();
        cy.url().should('include', '/users');
        cy.get('.v-card').should('have.length.at.least', 2);
    });

    it('User removes movies from favorites and logout', () => {
        cy.get('[data-cy="Delete"]').each(button => {
            cy.wrap(button).click();
        });
        cy.get('.v-card').should('have.length', 0);
        cy.get('[data-cy="Logout"]').click();
        cy.url().should('include', '/login'); // Ensure the user is back on the login page
    });
  });
  