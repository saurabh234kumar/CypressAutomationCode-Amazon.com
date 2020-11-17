/// <reference types="Cypress" />

context('Amazon Tests - Products', () => {
    
  //This will run before each test
  beforeEach(() => {
    cy.log('Opening homepage')
    cy.visit('https://www.amazon.com')
    //Verify homepage element is visible
    cy.get('#nav-link-accountList').should('visible')
  })

  //To Check the total displayed number of results for category Smart Home | Televisions
  it('Check the total displayed number of results for category Smart Home | Televisions', () => {
    cy.log('Verifying total number of smart televisions')
    //Navigate to products page
    cy.get('#nav-hamburger-menu').should('visible')
    cy.get('#nav-hamburger-menu').click()
    cy.xpath('//*[text()="Smart Home"]').should('visible')
    cy.xpath('//a[@data-menu-id="7"]').click()
    cy.xpath('//*[text()="Televisions"]').should('visible')
    cy.xpath('//*[text()="Televisions"]').click()
    //Verify total number of count and products displayed is same
    cy.get('#s-result-count').then(($result) => {
        var totalProductCount = 59
        var totalPageCount = 0
        const totalCount = parseInt($result.text().split(" ")[2])
        cy.log(totalCount)
        cy.get('#mainResults ul li').its('length').then(($size) => {
           // totalProductCount = totalProductCount + $size
            //cy.log(totalProductCount)
            totalPageCount = parseInt(totalCount / totalProductCount)
            cy.log(totalPageCount)
            cy.get('#pagnNextString',{ timeout: 30000 }).click()
            var genArr = Array.from({length:totalPageCount},(v,k)=>k+1)
            cy.wrap(genArr).each((index) => {
                cy.xpath('//div[contains(@class,"s-main-slot s-result-list")]//span[@class="a-size-base"]',{ timeout: 30000 }).its('length').then(($size) => {
                    totalProductCount = totalProductCount + $size
                    cy.log(totalProductCount)
                })
                cy.get('li.a-last',{ timeout: 30000 }).click()
                cy.get('li.a-last').then(($btn) => {
                    if ($btn.hasClass('a-disabled')) {
                        expect(totalCount).to.equal(totalProductCount)
                    } else {
                        $btn.click()
                    }
                })
            })
        })
    })
  })


})