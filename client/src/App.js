import './App.css';
import { Routes, Route } from "react-router-dom";
import Patient from "./components/Patient";
import PatientDetails from "./components/PatientDetails";
import PatientCreate from './components/PatientCreate';
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Patient />} />
        <Route path="/:id" element={<PatientDetails />} />
        <Route path="/create" element={<PatientCreate />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
