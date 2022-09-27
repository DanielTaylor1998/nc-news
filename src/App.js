import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Articles } from './components/Articles';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import { Users } from './components/Users';

function App() {
  return (
    <div className="App">
      <Header/>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Articles" element={<Articles />}/>
        <Route path="/Users" element={<Users />}/>
      </Routes>
    </div>
  );
}

export default App;
