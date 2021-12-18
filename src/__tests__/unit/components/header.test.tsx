import { screen, render, fireEvent } from '@testing-library/react';
import { useWeb3 } from '@/hooks/useWeb3';
import Header from '@/components/Header/Header';

const mockActivate = jest.fn();
const mockDeactivate = jest.fn();

jest.mock('@/hooks/useWeb3', () => ({
  useWeb3: jest.fn(() => ({
    activate: mockActivate,
    deactivate: mockDeactivate,
  })),
}));

describe('Header component when !active', () => {
  beforeEach(() => {
    render(<Header />);
  });
  it('Expect activate to be called on click', () => {
    const connectButton = screen.getByTestId('connect-button');
    expect(connectButton.textContent).toBe('Connect wallet');

    const burgerMenuButton = screen.queryByTestId('burger-icon');
    expect(burgerMenuButton).toBeTruthy();

    const profileLink = screen.queryByText('Profile');
    expect(profileLink).toBeFalsy();

    fireEvent.click(connectButton);

    expect(mockActivate).toHaveBeenCalled();
    expect(mockDeactivate).not.toHaveBeenCalled();
  });
});

describe('Header when active', () => {
  beforeEach(() => {
    (useWeb3 as jest.Mock).mockReturnValueOnce({
      deactivate: mockDeactivate,
      active: true,
    });
    render(<Header />);
  });

  it('Expect deactivate to be called on click', () => {
    const connectButton = screen.getByTestId('connect-button');
    expect(connectButton.textContent).toBe('Disconnect');

    // const profileLink = screen.getByText('Profile');
    // expect(profileLink).toBeTruthy();

    fireEvent.click(connectButton);

    expect(mockDeactivate).toHaveBeenCalled();
    expect(mockActivate).not.toHaveBeenCalled();
  });
});
