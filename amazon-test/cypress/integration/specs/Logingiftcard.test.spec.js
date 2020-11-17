/// <reference types="Cypress" />

context('Amazon Tests - Login & Gift Card', () => {
  
  //This will run before each test
  beforeEach(() => {
    //Opening homepage
    cy.log('Opening homepage')
    cy.visit('https://www.amazon.com')
    //Verify homepage element is visible
    cy.get('#nav-link-accountList').should('visible')
    //Navigate to login page
    cy.get('#nav-link-accountList').click()
    cy.log('Login')
    //Enter email
    cy.get('#ap_email').should('visible')
    cy.get("#ap_email").type("testmaileve@gmail.com")
    cy.get('#continue').click()
    //Enter password and login
    cy.get('#ap_password').should('visible')
    cy.get("#ap_password").type("test@1234")
    cy.get('#signInSubmit').click()
  })
  
  //This will run after each test
  afterEach(() => {
    cy.log('Logout')
    //Navigate to account options and logout
    cy.get('#nav-logo-sprites').click()
    cy.get('#nav-link-accountList').trigger('mouseover')
    cy.get('#nav-item-signout').click()
  })

  //To check gift card balance is $0.00
  it('Check gift card balance is $0.00', () => {
    cy.log('Verifying gift card balance')
    //Navigate to account options
    cy.get('#nav-link-accountList').should('visible')
    cy.get('#nav-link-accountList').click()
    //Navigate to gift card page
    cy.xpath('//*[@data-card-identifier="GiftCards"]').should('visible')
    cy.xpath('//*[@data-card-identifier="GiftCards"]').click()
    //Verify gift card balance
    cy.get('#gc-ui-balance-gc-balance-value').should('visible')
    cy.get('#gc-ui-balance-gc-balance-value').should('contain', '$0.00')
  })


})