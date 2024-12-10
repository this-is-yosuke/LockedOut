import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {EscapeRoom, Home, Login, User, FAQ, Register, Contact} from './pages'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/room" element={<EscapeRoom />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;