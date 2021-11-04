describe ('Form user flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the appropriate elements', () => {
    cy.contains('WellNews')
      .get('h2').contains('how are you feeling today?')
      .get('.happy-btn').should('be.visible')
      .get('.neutral-btn').should('be.visible')
      .get('.sad-btn').should('be.visible')
      .get('.view-synopsis-button').should('be.visible')
  })

  it('should take you to the news feed when the happy sentiment button is chosen', () => {
    cy.get('.happy-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the neutral sentiment button is chosen', () => {
    cy.get('.neutral-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the sad sentiment button is chosen', () => {
    cy.get('.sad-btn').click()
      .url().should('include', '/feed')
  })

  it('should show a synopsis of why you should choose your sentiment when the "Why we ask?" button is clicked', () => {
    cy.get('.view-synopsis-button').click()
      .get('.wellnews-synopsis').should('be.visible')
  })

  it('should hide the synopsis when the "Why we ask?" button is clicked again', () => {
    cy.get('.view-synopsis-button').click()
      .get('.view-synopsis-button').click()
      .get('.wellnews-synopsis').should('not.be.visible')
  })
})
