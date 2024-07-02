
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import Home from './components/Home';

function App() {
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
