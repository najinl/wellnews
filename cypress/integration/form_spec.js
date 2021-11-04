describe ('Form user flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the appropriate elements', () => {
    cy.contains('WellNews')
      .get('.cy-sentiment-question').contains('how are you feeling today?')
      .get('.cy-happy-btn').should('be.visible')
      .get('.cy-neutral-btn').should('be.visible')
      .get('.cy-sad-btn').should('be.visible')
      .get('.cy-view-synopsis-button').should('be.visible')
  })

  it('should take you to the news feed when the happy sentiment button is chosen', () => {
    cy.get('.cy-happy-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the neutral sentiment button is chosen', () => {
    cy.get('.cy-neutral-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the sad sentiment button is chosen', () => {
    cy.get('.cy-sad-btn').click()
      .url().should('include', '/feed')
  })

  it('should show a synopsis of why you should choose your sentiment when the "Why we ask?" button is clicked', () => {
    cy.get('.cy-view-synopsis-button').click()
      .get('.cy-wellnews-synopsis').should('be.visible')
  })

  it('should hide the synopsis when the "Why we ask?" button is clicked again', () => {
    cy.get('.cy-view-synopsis-button').click()
      .get('.cy-view-synopsis-button').click()
      .get('.cy-wellnews-synopsis').should('not.be.visible')
  })
})
