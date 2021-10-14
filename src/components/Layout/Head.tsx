import NextHead from 'next/head';

export interface HeadPropsT {
  metaTitle: string;
  metaDescription: string;
}

const Head: React.FC<HeadPropsT> = ({ metaTitle, metaDescription }) => {
  return (
    <NextHead>
      <title>{metaTitle || 'NFT-platform'}</title>
      <meta name="description" content={metaDescription || 'Get your next NFT here'} />
    </NextHead>
  );
};

export default Head;
