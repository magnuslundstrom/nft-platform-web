import NextHead from 'next/head';

export interface HeadPropsT {
  metaTitle: string;
  metaDescription: string;
}

const Head: React.FC<HeadPropsT> = ({ metaTitle, metaDescription }) => (
  <NextHead>
    <title>{metaTitle || 'NFT-platform'}</title>
    <meta
      name="description"
      content={metaDescription || 'Get your next NFT here'}
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </NextHead>
);

export default Head;
