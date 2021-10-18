import { useState, useEffect } from 'react';
import useSWR from 'swr';
import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';

export type State = {
  contractAddress: string;
  nfts: NFTT[];
};

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<ContractT[]>('http://localhost:3080', fetcher);
  const [nfts, setNfts] = useState<State[]>([]);

  useEffect(() => {
    if (account && data) {
      const signer = library.getSigner(account);
      data.forEach((contract) => {
        const metaContract = new ethers.Contract(
          contract.contract_address,
          contract.abi,
          signer,
        );

        metaContract.functions.ownedNfts(account).then((_data) => {
          const realData = _data[0];
          const tokens = realData.map((token: any) => ({
            tokenURI: token.tokenURI,
            tokenId: token.tokenId.toNumber(),
          }));
          const obj = {
            contractAddress: contract.contract_address,
            nfts: tokens,
          };
          setNfts([obj]);
        });
      });
    }
  }, [account, data, error, library]);

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
    >
      <section>
        <h1>
          Welcome to your collection:
          {account}
        </h1>
        <NFTList list={nfts} />
      </section>
    </Layout>
  );
};

export default Profile;
