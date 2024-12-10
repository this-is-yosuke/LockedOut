import { Nav, Header, How, Try, Footer } from '../containers';

// React.FC (or React.FunctionComponent) is a generic type for functional components
const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Header />
      <How />
      <Try />
      <Footer />
    </>
  );
};

export default Home;