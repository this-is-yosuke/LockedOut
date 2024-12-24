import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EscapeRoom, Home, Login, User, FAQ, Register, Contact, CreateRoom } from './pages';
import ProtectedRoute from './utils/protectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Updated /user route to include dynamic username */}
          <Route path="/user/:username" element={<User />} />
          <Route path="/room/:roomId" element={<ProtectedRoute><EscapeRoom /></ProtectedRoute>} />
          <Route path="/faq" element={<ProtectedRoute><FAQ/></ProtectedRoute>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contact" element={<ProtectedRoute><Contact/></ProtectedRoute>} />
          <Route path="/createroom" element={<ProtectedRoute><CreateRoom /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;