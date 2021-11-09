describe ('TopicFeed', () => {
  beforeEach(() => {
      cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
      .intercept('https://api.nytimes.com/svc/topstories/v2/magazine.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr', {fixture: 'ny-article-fetch-magazine.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new approach on getting a frontend developer gig&token=beb0091844524790b7672a69bac06a2a', {fixture: 'frontend-job-hunt-sentiment.json'})
  })

  it('Should render the appropriate elements', () => {
    cy.visit('/').get('.cy-negative-btn').click()
    cy.contains('WellNews')
    cy.get('.history-btn').contains('History')
    cy.get('[href="/search-topic"]').children().should('have.class', 'list-btn')
    cy.get('.check-in-btn').contains('Check In')
  })

  it('Should, when the sad button is clicked, show the articles sorted in descending order by sentiment', () => {
    cy.visit('/').get('.cy-negative-btn').click()
    cy.get('[href="/search-topic"]').children()
    .get('.list-btn').click()
    cy.get('[href="/feed/magazine"]').click()
    cy.get('.cy-article-card').first().contains('The Happy Shoot')
  })

})
