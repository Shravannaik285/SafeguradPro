import react from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Equipments from './pages/Equipments.jsx';
import Inspection  from './pages/Inspection.jsx';
import Report from './pages/Report.jsx';
function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/navbar" element={<Navbar/>} />
      <Route path="/inspection" element={<Inspection/>} />
      <Route path="/equipment" element={<Equipments/>} />
      <Route path="/report" element ={<Report/>} />
    </Routes>
  )
}

export default App;