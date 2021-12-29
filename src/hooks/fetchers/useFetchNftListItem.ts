import useSWR from 'swr';

export const useFetchNftListItem = (tokenURI: string) => {
  const fetcher = async (url: string) => {
    const json = await fetch(url).then((res) => res.json());
    return json;
  };

  return useSWR(tokenURI, fetcher);
};
