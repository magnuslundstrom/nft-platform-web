import { testIds } from '../testIds';

describe('Connect/disconnect wallet story', () => {
  it('connect/disconnect wallet', () => {
    cy.visit('http://localhost:3000');

    // Pre-connect
    cy.findByTestId(testIds.header.connectButton).contains('Connect wallet');
    cy.findByTestId(testIds.layout.connectWalletAlert).should('be.visible');

    cy.findByTestId(testIds.header.connectButton).click();
    cy.acceptMetamaskAccess();

    // Post-connect
    cy.findByTestId(testIds.header.connectButton).contains('Disconnect');
    cy.get('[data-testid="connect-wallet-alert"]').should('not.exist');
  });
});
