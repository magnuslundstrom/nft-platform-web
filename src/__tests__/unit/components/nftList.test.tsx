import { screen, render } from '@testing-library/react';
import NFTList from '@/components/NFTList/NFTList';
import { mockNft } from '@/__tests__/mockData/nftListMockData';

const emptyListMessage = 'No NFTs right now';

describe('test empty list', () => {
  beforeEach(() => {
    render(<NFTList emptyListMessage={emptyListMessage} list={[]} />);
  });
  it('displays empty list message', () => {
    const message = screen.getByText(emptyListMessage);
    expect(message).toBeTruthy();
  });

  it("doesn't display NFT list wrapper", () => {
    const nftList = screen.queryByTestId('nft-list');
    expect(nftList).toBeFalsy();
  });
});

describe('test list with entries', () => {
  describe('1 entry', () => {
    beforeEach(() => {
      render(<NFTList emptyListMessage={emptyListMessage} list={[mockNft]} />);
    });
    it('should not show empty list message', () => {
      const message = screen.queryByText(emptyListMessage);
      expect(message).toBeFalsy();
    });

    it('should display 1 NFT', () => {
      const nftListItems = screen.queryAllByTestId('nft-list-item');
      expect(nftListItems.length).toBe(1);
    });
  });

  describe('2 entries', () => {
    beforeEach(() => {
      render(
        <NFTList
          emptyListMessage={emptyListMessage}
          list={[mockNft, { ...mockNft, tokenId: 2 }]}
        />,
      );
    });

    it('should display 2 NFTs', () => {
      const nftListItems = screen.queryAllByTestId('nft-list-item');
      expect(nftListItems.length).toBe(2);
    });
  });
});
