describe('Feed', () => {
  beforeEach(() => {
    cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})

    cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=91255d6d440f4c24a1b4a5ec443588d8', {fixture: 'manhattan-madam-sentiment.json'})

    cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=91255d6d440f4c24a1b4a5ec443588d8', {fixture: 'affair-sentiment.json'})

    cy.visit('/')
  })

  it('Should show the header', () => {
    cy.get('.cy-negative-btn').click()
    cy.contains('WellNews')
  })

  it('Should, when the positive button is clicked, show the articles sorted in ascending order by sentiment', () => {
    cy.get('.cy-strongly-positive-btn').click()
      .get('.cy-article-card').first().contains('Should I Tell a Facebook Friend I Had an Affair With Her Partner?')
  })

  it('Should, when the sad button is clicked, show the articles sorted in descending order by sentiment', () => {
    cy.get('.cy-negative-btn').click()
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
