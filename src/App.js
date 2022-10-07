import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Articles } from './components/Articles';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import { Users } from './components/Users';
import { Article } from './components/Article'
import { useContext } from 'react';
import { UserContext } from './contexts/user';
import { User } from './components/User';
import { Error } from './components/Error';
import { Footer } from './components/Footer';

function App() {

  const value = useContext(UserContext);

  return (
    <div className="App">
      <Header />
      <Nav />
      <div className="appcontent">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Articles?topic" element={<Articles />} />
          <Route path="/Articles/:article_id" element={<Article />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/User" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
