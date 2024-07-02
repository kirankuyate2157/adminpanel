
import { Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
       <Route path="/auth" element={<div>in App routes</div>} />
      <Routes>
        <Route path="/" element={<div>in App routes</div>} />
        <Route path="*" element={<div>in App routes</div>} />
      </Routes>
    </div>
  );
}

export default App;
