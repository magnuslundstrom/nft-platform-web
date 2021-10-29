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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </NextHead>
);

export default Head;
