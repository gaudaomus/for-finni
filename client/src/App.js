import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
