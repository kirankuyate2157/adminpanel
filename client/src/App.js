
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import Home from './components/Home';
import axios from 'axios';
import HomeLayout from './layout/HomeLayout';
import DashboardSkeleton from './components/DashboardSkeleton';
import Members from './components/Members';



function App() {
  axios.defaults.baseURL = "https://adminpanel-3k4l.onrender.com/api/v1";
  axios.defaults.params = {};
  axios.defaults.withCredentials = true;

  return (

      <div className="h-[100vh] w-[100vw]">
<Toaster/>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomeLayout />} >
            <Route path="/" element={<DashboardSkeleton />} />
            <Route path="/members" element={<Members />} />
            <Route path="*" element={<div>in App routes</div>} />
          </Route>
        </Routes>
      </div>

  );
}

export default App;
