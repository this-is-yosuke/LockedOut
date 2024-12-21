import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { UserProvider } from './contexts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> {/* Pass children here */}
      <App />
    </UserProvider>
  </StrictMode>
);