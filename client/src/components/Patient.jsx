import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "./NavBar";

const Patient = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/account/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      if (!status) {
        return removeCookie("token"), navigate("/account/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/account/signup");
  };

  return (
    <div className="grid justify-items-center">
      <NavBar username={username} />
      
    </div>
  );
};

export default Patient;
