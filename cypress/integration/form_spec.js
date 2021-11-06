describe ('Form user flow', () => {
  beforeEach(() => {
    cy.visit('/')
      .intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
  })

  it('should render the appropriate elements', () => {
    cy.contains('WellNews')
      .get('.cy-sentiment-question').contains('What kind of mood are you in?')
      .get('.cy-completely-positive-btn').should('be.visible')
      .get('.cy-positive-btn').should('be.visible')
      .get('.cy-neutral-btn').should('be.visible')
      .get('.cy-negative-btn').should('be.visible')
      .get('.cy-completely-negative-btn').should('be.visible')
      .get('.cy-view-synopsis-button').should('be.visible')
  })

  it('should take you to the news feed when the completely positive sentiment button is chosen', () => {
    cy.get('.cy-completely-positive-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the neutral sentiment button is chosen', () => {
    cy.get('.cy-neutral-btn').click()
      .url().should('include', '/feed')
  })

  it('should take you to the news feed when the negative sentiment button is chosen', () => {
    cy.get('.cy-negative-btn').click()
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
