import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavBar = ({username}) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/account/signup");
  };

  return (
    username &&
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                className="block py-2 pl-3 pr-4 hover:text-white hover:bg-blue-700 hover:rounded bg-transparent text-blue-700"
                to="/patient"
              >
                Home
              </Link>
            </li>
            <li>
              <span
                class="block py-2 pl-3 pr-4 text-white bg-black rounded bg-transparent text-black"
              >
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
  );
};

export default NavBar;
