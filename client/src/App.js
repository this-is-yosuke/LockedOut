import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EscapeRoom, Home, Login, User, FAQ, Register, Contact, CreateRoom } from './pages';
function App() {
    return (<BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          
          {/* Updated /user route to include dynamic username */}
          <Route path="/user/:username" element={<User />}/>
          
          <Route path="/room/:roomId" element={<EscapeRoom />}/>
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/createroom" element={<CreateRoom />}/>
        </Routes>
      </div>
    </BrowserRouter>);
}
export default App;
