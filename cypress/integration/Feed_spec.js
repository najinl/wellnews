describe('Feed', () => {
  beforeEach(() => {
    // add your Dandelion API token here; remove before merging to main
    const dandelionToken = '488823ba0f914b1f8eddc319191cbc7a';
    if (dandelionToken) { console.log('Token in use; remember to remove before opening a PR')}
    cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
      .intercept(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=${dandelionToken}`, {fixture: 'manhattan-madam-sentiment.json'})
      .intercept(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=${dandelionToken}`, {fixture: 'affair-sentiment.json'})
  })

  it('Should show the header', () => {
    cy.visit('/').get('.cy-sad-btn').click()
      .get('.cy-header-text').contains('WellNews')
  })

  it('Should, when the happy button is clicked, show the articles sorted in ascending order by sentiment', () => {
    cy.visit('/').get('.cy-happy-btn').click()
      .get('.cy-article-card').first().contains('Should I Tell a Facebook Friend I Had an Affair With Her Partner?')
  })

  it('Should, when the sad button is clicked, show the articles sorted in descending order by sentiment', () => {
    cy.visit('/').get('.cy-sad-btn').click()
      .get('.cy-article-card').first().contains('The Manhattan ‘Madam’ Who Hobnobbed With the City’s Elite')
  })

  it('Should show article cards with an image and title', () => {
    cy.visit('/').get('.cy-neutral-btn').click()
      .get('.cy-article-image').first()
        .should('be.visible')
      .get('.cy-article-title').first()
        .should('be.visible')
  })
})
