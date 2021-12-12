import { screen, render } from '@testing-library/react';
import Layout from '@/components/Layout/Layout';
import { useWeb3 } from '@/hooks/useWeb3';

const metaTitle = 'Welcome to NFT-platform';
const metaDescription = 'A meta description';

jest.mock('@/hooks/useWeb3', () => ({
  useWeb3: jest.fn(() => ({ active: false })),
}));

describe('Layout component not active message', () => {
  beforeEach(async () => {
    (useWeb3 as jest.Mock).mockReturnValueOnce({ active: true });
    render(<Layout metaTitle={metaTitle} metaDescription={metaDescription} />);
  });

  it('Not connected alert shows', () => {
    const connectWalletAlert = screen.queryByTestId('connect-wallet-alert');
    expect(connectWalletAlert).toBeFalsy();
  });
});
describe('Layout component not active message', () => {
  beforeEach(() => {
    render(<Layout metaTitle={metaTitle} metaDescription={metaDescription} />);
  });

  it('Not connected show NOT show if active', () => {
    const connectWalletAlert = screen.queryByTestId('connect-wallet-alert');
    expect(connectWalletAlert).toBeTruthy();
  });
});

describe('Layout component no load prop', () => {
  beforeEach(() => {
    render(<Layout metaTitle={metaTitle} metaDescription={metaDescription} />);
  });
  it('Contains header component', () => {
    const header = screen.getByTestId('header');
    expect(header).toBeTruthy();
  });
  it("Loading spinner doesn't exists", () => {
    const loadingSpinner = screen.queryByTestId(
      'layout-content-loading-spinner',
    );
    expect(loadingSpinner).toBeFalsy();
  });
});

describe('Layout component load prop', () => {
  beforeEach(() => {
    render(
      <Layout metaTitle={metaTitle} metaDescription={metaDescription} loading>
        <div data-testid="layout-test-children">Test</div>
      </Layout>,
    );
  });
  it('Loading spinner exists', () => {
    const loadingSpinner = screen.getByTestId('layout-content-loading-spinner');
    expect(loadingSpinner).toBeTruthy();
  });

  it("Children don't exist", () => {
    const children = screen.queryByTestId('layout-test-children');
    expect(children).toBeFalsy();
  });
});

/* Could also test:
- Snackbar (messaging functionality);
- Backdrop;
*/
