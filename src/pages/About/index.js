import { Stack, styled } from '@mui/material';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';

const AboutContainer = styled(Stack)(({}) => ({
  height: '100%',
  padding: 2,
  backgroundColor: '#000000',
}));

function About() {
  return (
    <>
      <Navbar />
      <AboutContainer>About page</AboutContainer>
      <Footer />
    </>
  );
}

export default About;
