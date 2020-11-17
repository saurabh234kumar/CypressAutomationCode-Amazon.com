/// <reference types="Cypress" />

context('Amazon Tests - Currency', () => {
    
  //This will run before each test
  beforeEach(() => {
    cy.log('Opening homepage')
    cy.visit('https://www.amazon.com')
    //Verify homepage element is visible
    cy.get('#nav-link-accountList').should('visible')
  })

  //To Check the selected currency AED displayed for the product price
  it('Check the selected currency AED displayed for the product price', () => {
    cy.log('Verifying product price is in AED')
    //Navigate to currency selection page
    cy.get('#icp-nav-flyout').should('visible')
    cy.get('#icp-nav-flyout').click()
    cy.get('#icp-sc-heading').should('visible')
    cy.get('#a-autoid-0-announce').click();
    //Select AED as currency
    cy.xpath('(//a[contains(text(),"AED")])[1]').should('visible')
    cy.xpath('(//a[contains(text(),"AED")])[1]').click()
    cy.get('#icp-btn-save').click()
    //Navigate to products page
    cy.get('#nav-hamburger-menu').should('visible')
    cy.get('#nav-hamburger-menu').click()
    cy.xpath('//*[text()="Electronics"]').should('visible')
    cy.xpath('//a[@data-menu-id="5"]').click()
    cy.xpath('//*[text()="Headphones"]').should('visible')
    cy.xpath('//*[text()="Headphones"]').click()
    //Verify AED for product price
    cy.get('span.a-price').each(($el) => {
        cy.wrap($el).should('visible')
        cy.wrap($el).should('contain', 'AED')
    })
  })


})