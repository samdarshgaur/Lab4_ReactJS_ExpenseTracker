import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ShowData from './Components/ShowData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowData />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
