import * as pageObj from '../page_objects/output.po.json';

describe('Login Test', () => {

    it('Examples', () => {
    cy.get(pageObj.login_page.email_input).type('test@email.com');
	cy.get(pageObj.login_page.password_input).type('P@ssWord1');
	cy.get(pageObj.login_page.login_button).click();
    });
    
});