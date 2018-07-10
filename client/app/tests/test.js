describe('Tests Tower Project', () => {
  it('Tests the homepage for basic elements', () => {
    cy.visit('/');
    cy.get('header')
  })
  it('Tests for the map element', () => {
    cy.get('map')
  })
})
