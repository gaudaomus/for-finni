import "./App.css";
import { Routes, Route } from "react-router-dom";
import Patient from "./components/Patient";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import PatientCreate from "./components/PatientCreate";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/list" element={<PatientList />} />
        <Route path="/patient/create" element={<PatientCreate />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
