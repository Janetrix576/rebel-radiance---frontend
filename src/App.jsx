import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = '642335350301-goq2co22qho68mrb548lu7jto62kief5.apps.googleusercontent.com'; 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;