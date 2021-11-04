describe('Feed', () => {
  // beforeEach(() => {
  //   cy.intercept("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr", {fixture: 'nyt-article-fetch.json'})
  //   cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=A%20new%20biography%20by%20Debby%20Applegate%20recounts%20the%20story%20of%20Polly%20Adler,%20who%20arrived%20in%20America%20from%20Russia%20at%2013%20and%20became%20New%20York\'s%20most%20successful%20brothel%20owner,%20befriending%20mobsters,%20policemen,%20politicians%20and%20writers.&token=beb0091844524790b7672a69bac06a2a', {fixture: 'manhattan-madam-sentiment.json'})
  //   cy.intercept('https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=The magazine\'s Ethicist columnist on responding to infidelity.&token=beb0091844524790b7672a69bac06a2a', {fixture: 'affair-sentiment.json'})
  //     .visit('/')
  //     .get('.cy-sad-btn').click()
  //   })

  it('Should display the feed', () => {
    cy.get('.cy-header-text').contains('WellNews')
  })
})
