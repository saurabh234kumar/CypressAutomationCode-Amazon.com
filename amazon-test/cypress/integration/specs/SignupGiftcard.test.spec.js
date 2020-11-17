/// <reference types="Cypress" />


context('Amazon Tests - SignUp & GiftCard balance check', () => {

  //This will run before each test
  beforeEach(() => {
    cy.log('Opening homepage')
    cy.visit('https://www.amazon.com')
    //Verify homepage element is visible
    cy.get('#nav-link-accountList').should('visible')
  })


    //To Signup
    it('Amazon Signup', () => {
    context('Signup Amazon Tests - Gift Card', () => {

    // Clicking on Account Menu Item to display hidden element
    cy.get('#nav-link-accountList').trigger('mouseover');
    //click on the hidden element Start Here
    cy.get('#nav-flyout-ya-newCust > a').should('visible')
    cy.get('#nav-flyout-ya-newCust > a').click();
    //Create account,Fill in the create-account form with full name, email and password
    cy.get('#ap_customer_name').should('visible')
    cy.get('#ap_customer_name').click().type('Test Amazon');
    cy.get('#ap_email').should('visible')
    cy.get('#ap_email').click().type('testmaileve@gmail.com');
    cy.get('#ap_password').should('visible')
    cy.get('#ap_password').click().type('test@1234');
    cy.get('#ap_password_check').should('visible')
    cy.get('#ap_password_check').click().type('test@1234');
    cy.get('#continue').should('visible')
    cy.get('#continue').click();
         })
    })
  
    //Login and To check gift card balance is $0.00
  it('Check gift card balance is $0.00', () => {
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