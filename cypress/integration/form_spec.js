

describe ('Form user flow', () => {
  beforeEach(() => {
    cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
    cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New York’s most successful brothel owner, befriending mobsters, policemen, politicians and writers.&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})

    cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazine’s Ethicist columnist on responding to infidelity.&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'}).visit('http://localhost:3000')
  })

  it('should render the appropriate elements', () => {
    cy.contains('WellNews')
    cy.get('h2').contains('how are you feeling today?')
    cy.get('.happy-btn').should('be.visible')
    cy.get('.neutral-btn').should('be.visible')
    cy.get('.sad-btn').should('be.visible')
    cy.get('.view-synopsis-button').should('be.visible')
  })

  it('should take you to the news feed when the happy sentiment button is chosen', () => {
    cy.get('.happy-btn').click()
    cy.url().should('include', '/feed')
  })

  it('should take you to the news feed when the neutral sentiment button is chosen', () => {
    cy.get('.neutral-btn').click()
    cy.url().should('include', '/feed')
  })

  it('should take you to the news feed when the neutral sentiment button is chosen', () => {
    cy.get('.sad-btn').click()
    cy.url().should('include', '/feed')
  })
})
