import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js';
import Uploading from './pages/Uploading.js';
import Success from './pages/Success';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/uploading' element={<Uploading/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
