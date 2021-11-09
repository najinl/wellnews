describe ('TopicForm', () => {
  beforeEach(() => {
    cy.visit('/')
      .intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
  })

  it('Should render the appropriate elements', () => {
    cy.visit('/').get('.cy-positive-btn').click()
    cy.get('[href="/search-topic"]').click()
    cy.contains('WellNews')
    cy.get('.cy-topic-selection').children().should('have.length', 26)
    cy.get('.cy-topic-selection')
    .first()
    .should('have.text', 'artsautomobilesbooksbusinessfashionfoodhealthhomeinsidermagazinemoviesnyregionobituariesopinionpoliticsrealestatesciencesportssundayreviewtechnologytheatert-magazinetravelupshotusworld')
  })

  it('Should, when the magazine topic is clicked, show only articles located in the magazine section', () => {
    cy.visit('/').get('.cy-positive-btn').click()
    cy.get('[href="/search-topic"]').click()
    cy.intercept('https://api.nytimes.com/svc/topstories/v2/magazine.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr', {fixture: 'ny-article-fetch-magazine.json'})
    .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
    .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new approach on getting a frontend developer git&token=beb0091844524790b7672a69bac06a2a', {fixture: 'frontend-job-hunt-sentiment.json'})
    cy.get('[href="/feed/magazine"]').click()
    cy.get('.cy-article-card').contains('Should I Tell a Facebook Friend I Had an Affair With Her Partner?')
    cy.get('.cy-article-card').contains('The Crap Shoot')
  })

  it('Should, when the books topic is clicked, show only articles located in the books section', () => {
    cy.visit('/').get('.cy-positive-btn').click()
    cy.get('[href="/search-topic"]').click()
    cy.intercept('https://api.nytimes.com/svc/topstories/v2/books.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr', {fixture: 'ny-article-fetch-books.json'})
    .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
    cy.get('[href="/feed/books"]').click()
    .get('.cy-article-card').first().contains('The Manhattan ‘Madam’ Who Hobnobbed With the City’s Elite')
  })

  it('Should take you to the sentiment quiz when the "check in" button is clicked', () => {
    cy.visit('/').get('.cy-neutral-btn').click()
    cy.get('[href="/search-topic"]').click()
    cy.intercept('https://api.nytimes.com/svc/topstories/v2/magazine.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr', {fixture: 'ny-article-fetch-magazine.json'})
    .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
    cy.get('[href="/feed/magazine"]').click()
    .get('.check-in-btn').click().url().should('eq', 'http://localhost:3000/')
  })
})
