
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import Home from './components/Home';
import axios from 'axios';


function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  axios.defaults.params = {};
  axios.defaults.withCredentials = true;
  
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<div>in App routes</div>} />
      </Routes>
    </div>
  );
}

export default App;
