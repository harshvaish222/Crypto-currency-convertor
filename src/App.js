import React from 'react';
import "./App.css";
import { Route, BrowserRouter as  Router, Routes} from 'react-router-dom';
import CoinPage from './routes/CoinPage';
import Home from './routes/Home';

function App() {
  return (
   <div className='Apps'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/CoinPage/:id' element={<CoinPage/>} />
        </Routes>
      </Router>
   </div>
  );
}

export default App;
