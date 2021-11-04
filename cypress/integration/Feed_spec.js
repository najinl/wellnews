describe('Feed', () => {
  it('Should display the feed', () => {
    cy.visit('http://localhost:3000/feed')
      .get('.cy-header-text').contains('WellNews')
  })
})
