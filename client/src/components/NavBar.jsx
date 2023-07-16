import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavBar = ({username}) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const Logout = () => {
    removeCookie("token", {path: "/"});
    navigate("/account/signup");
  };

  return (
    username && (
      <nav className="bg-white border-gray-200">
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
