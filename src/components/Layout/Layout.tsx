import { Container } from '@mui/material';
import Header from '@/components/Header/Header';
import Head, { HeadPropsT } from '@/components/Head/Head';

type Props = HeadPropsT;

const Layout: React.FC<Props> = ({ children, metaTitle, metaDescription }) => (
  <>
    <Head metaTitle={metaTitle} metaDescription={metaDescription} />
    <Header />
    <Container maxWidth="xl" sx={{ marginTop: 4 }} component="main">
      {children}
    </Container>
  </>
);

export default Layout;
