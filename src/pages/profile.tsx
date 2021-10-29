import { useState, useEffect } from 'react';
import useSWR from 'swr';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { fetchGenericJson } from '@/helpers/fetchers/fetchGenericJson';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';

export type StateT = {
  contractAddress: string;
  nfts: NFTT[];
};

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();
  const { data, error } = useSWR<ContractT[]>(
    'http://localhost:3080',
    fetchGenericJson,
  );
  const [nfts, setNfts] = useState<StateT[]>([]);
  console.log('x');
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
        <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
          Welcome to your collection
        </Typography>
        <NFTList list={nfts} />
      </section>
    </Layout>
  );
};

export default Profile;
