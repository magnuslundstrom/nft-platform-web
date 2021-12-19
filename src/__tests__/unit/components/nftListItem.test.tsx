import { screen, render } from '@testing-library/react';
import NFTListItem from '@/components/NFTList/NFTListItem';
import { useFetchNftListItem } from '@/hooks/fetchers/useFetchNftListItem';
import { mockNft } from '@/__tests__/mockData/nftListMockData';

jest.mock('@/hooks/fetchers/useFetchNftListItem', () => ({
  useFetchNftListItem: jest.fn(() => ({})),
}));

describe('Test loading (No mocked async call, so it will be in loading state)', () => {
  const item = { ...mockNft };
  delete item.price;
  beforeEach(() => {
    render(<NFTListItem item={item} />);
  });

  it('Gives loading feedback', () => {
    const imageLoadingPlaceholder = screen.queryByTestId(
      'nft-list-item-image-loading',
    );
    expect(imageLoadingPlaceholder).toBeTruthy();

    const loadingText = screen.queryByText('Loading');
    expect(loadingText).toBeTruthy();
  });
});

describe('Displays correct data when data is provided without price', () => {
  const item = { ...mockNft };
  delete item.price;

  beforeEach(() => {
    (useFetchNftListItem as jest.Mock).mockReturnValueOnce({
      data: {
        name: 'Fire Fighter',
        image: 'http://nft.josefinegade.com/punk-1.png',
      },
    });
    render(<NFTListItem item={item} />);
  });

  it("It doesn't show price", async () => {
    const imageElement = screen.getByTestId('nft-list-item-image');
    const nftNameElement = screen.getByText('Fire Fighter');
    const priceElement = screen.queryByTestId('nft-list-item-price');
    const ctaButton = screen.queryByTestId('nft-list-item-cta');

    expect(imageElement).toBeInTheDocument();
    expect(nftNameElement).toBeInTheDocument();
    expect(priceElement).not.toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton?.textContent).toBe('See more');
  });
});

describe('Display correct data when data is provided', () => {
  const item = { ...mockNft };

  beforeEach(() => {
    (useFetchNftListItem as jest.Mock).mockReturnValueOnce({
      data: {
        name: 'Fire Fighter',
        image: 'http://nft.josefinegade.com/punk-1.png',
      },
    });
    render(<NFTListItem item={item} />);
  });

  it('It does show price', async () => {
    const imageElement = screen.getByTestId('nft-list-item-image');
    const nftNameElement = screen.getByText('Fire Fighter');
    const priceElement = screen.queryByTestId('nft-list-item-price');
    const ctaButton = screen.queryByTestId('nft-list-item-cta');

    expect(imageElement).toBeInTheDocument();
    expect(nftNameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton?.textContent).toBe('Buy now');
  });
});
