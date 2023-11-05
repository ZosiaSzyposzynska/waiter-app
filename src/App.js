import { Container } from 'react-bootstrap';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Table from './components/pages/Table/Table';
import Footer from './components/views/Footer';
import Header from './components/views/Header';

const App = () => {
  return (
    <main> 
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
        
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;