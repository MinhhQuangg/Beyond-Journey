import './App.css'; 
import { Login } from './pages/Login'; 
import { SignUp } from './pages/Signup'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing react-router components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
