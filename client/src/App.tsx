import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; // Assuming Home is your home page component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;