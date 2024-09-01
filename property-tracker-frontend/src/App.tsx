import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import RegisterProperty from './pages/RegisterProperty';
import TransferOwnership from './pages/TransferOwnership';
import PropertyHistory from './pages/PropertyHistory';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalContext from './contexts/GlobalContext';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalContext>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/register'
                element={<RegisterProperty />}
              />
              <Route
                path='/transfer'
                element={<TransferOwnership />}
              />
              <Route
                path='/history'
                element={<PropertyHistory />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </GlobalContext>
    </Router>
  );
};

export default App;
