describe('Article', () => {
  beforeEach(() => {
    cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
      .intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazines Ethicist columnist on responding to infidelity&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})

    cy.visit('/')
      .get('.cy-sad-btn').click()
      .url().should('include', '/feed')
      .get('.cy-article-link').first().click()
  })

  it('Should display the article title', () => {
    cy.get('.cy-single-article-title').contains('The Manhattan ‘Madam’ Who Hobnobbed With the City’s Elite')
  })

  it('Should display the article image and its caption', () => {
    cy.get('.cy-single-article-image').should('have.attr', 'src', 'https://static01.nyt.com/images/2021/10/25/books/review/00Bren/00Bren-superJumbo.jpg')

    cy.get('.cy-single-article-caption').contains('Polly Adler exiting a police van after being arrested in 1936. The more successful Polly’s brothel became, the more hounded she was — by the police, by Tammany Hall, by the Broadway mob.')
  })

  it('Should display the article abstract', () => {
    cy.get('.cy-single-article-abstract').contains('A new biography by Debby Applegate recounts the story of Polly Adler, who arrived in America from Russia at 13 and became New Yorks most successful brothel owner, befriending mobsters, policemen, politicians and writers')
  })

  it('Should display placeholder text', () => {
    cy.get('p').eq(1).contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  })

  it('Should have Back link to return to the feed', () => {
    cy.get('.cy-back-link').click()
      .url().should('eq', 'http://localhost:3000/feed')
  })


})

describe('Article Error', () => {
  beforeEach(() => {
    cy.visit('/feed/999999999')
  })

  it('Should display a helpful error message', () => {
    cy.get('.cy-error-message').contains('No match for')
  })

  it('Should display a button to redirect back to feed', () => {
    cy.get('.cy-feed-link').click()
      .url().should('eq', 'http://localhost:3000/feed')
  })
})
