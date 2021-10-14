interface NFTT {
  tokenId: number;
  tokenURI: string;
}

interface TokenURIDataT {
  attributes: {
    trait_type: string;
    value: string;
  }[];
  description: string;
  image: string;
  name: string;
}
