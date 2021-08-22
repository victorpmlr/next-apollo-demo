describe('Contacts page tests', () => {

  it('Displays list & UI correctly', () => {
    cy.visit('/contacts')
    cy.get('.contact-card').should('have.length', 20)
    cy.get('.contact-card:first-of-type').should('include.text', 'Mr. Andres Abbott')
    cy.get('.contact-card:last-of-type').should('include.text', 'Brendan Rath')
    cy.get('#error').should('not.exist')
    cy.get('#search-input').should('be.enabled')
    cy.get('#load-more').should('be.enabled')
  })

  it('Type in 2 chars', () => {
    cy.visit('/contacts')
    cy.get('#search-input')
      .type('vi')
      .should('have.value', 'vi')
    cy.get('.contact-card').should('have.length', 20)
    cy.get('#search-status').should('not.exist')
  })

  it('Search "victor" - 3 results', () => {
    cy.visit('/contacts')
    cy.get('#search-input')
      .type('victor')
      .should('have.value', 'victor')
    cy.get('.contact-card').should('have.length', 3)
    cy.get('#search-status').should('have.text', 'Results for "victor":')
  })

  it('Search "azeaze" - 0 result', () => {
    cy.visit('/contacts')
    cy.get('#search-input')
      .type('azeaze')
      .should('have.value', 'azeaze')
    cy.get('.contact-card').should('have.length', 0)
    cy.get('#search-status').should('have.text', 'No results for "azeaze"')
  })

  it('Load more', () => {
    cy.visit('/contacts')
    cy.get('.contact-card').should('have.length', 20)
    cy.get('#load-more')
      .click()
    cy.get('.contact-card').should('have.length', 40)
    cy.get('#load-more')
      .click()
    cy.get('.contact-card').should('have.length', 60)
  })

  it('Load more too many times in a row', () => {
    cy.visit('/contacts')
    cy.get('.contact-card').should('have.length', 20)
    cy.get('#load-more')
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
    cy.get('#error').should('have.text', 'You are trying to access \'people\' too often')
  })
})

