import { Routes, Route, Navigate } from "react-router-dom";
import Patient from "./components/Patient";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import PatientCreate from "./components/PatientCreate";

function App() {
  return (
    <div className="flex h-full justify-center">
      <Routes>
        <Route path="/" element={<Navigate to="/patient/list" />} />
        <Route path="/patient" element={<Patient />}>
          <Route path="list" element={<PatientList />} />
          <Route path="create" element={<PatientCreate isUpdate={false} />} />
          <Route path=":id/update" element={<PatientCreate isUpdate={true} />} />
          <Route path=":id" element={<PatientDetails />} />
        </Route>
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
