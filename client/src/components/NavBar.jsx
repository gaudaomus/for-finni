import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NavBar = ({ username }) => {
  const navigate = useNavigate();
  const handleError = (err) => console.log(err);
  const handleSuccess = (msg) => console.log(msg);
  
  const Logout = async () => {
    try {
      console.log(document.cookie)
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const { data } = await axios.get("http://localhost:4000/account/logout");
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/account/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    username && (
      <nav className="flex bg-white border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="items-center justify-between w-full flex"
            id="navbar-cta"
          >
            <ul className="flex font-medium p-4 rounded-lg flex-row space-x-8 mt-0 border-0 bg-white">
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 hover:text-white hover:bg-blue-700 hover:rounded bg-transparent text-blue-700"
                  to="/patient/list"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="block py-2 pl-3 pr-4 bg-black rounded bg-transparent text-black">
                  You are logged in as {username}
                </span>
              </li>
              <li>
                <button
                  className="block py-2 pl-3 pr-4 hover:text-white hover:bg-red-600 hover:rounded text-red-600 bg-transparent"
                  onClick={Logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default NavBar;
