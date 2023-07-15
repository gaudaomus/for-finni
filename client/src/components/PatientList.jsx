import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "./NavBar";

const PatientList = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [patients, setPatients] = useState([]);
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
      } else {
        getPatients();
      }
    };

    const getPatients = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/patient/list",
        {},
        { withCredentials: true }
      );
      setPatients(data);
      console.log(data);
      console.log(patients);
    };
    verifyCookie();
  }, []);
  return (
    <div className="grid justify-items-center">
      <NavBar username={username} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12 max-w-screen-xl">
        <div class="pb-4 bg-white">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
          <button
            className="pb-4 bg-white"
            onClick={function () {
              navigate("/patient/create");
            }}
          >
            Create new patient
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                More Details
              </th>
            </tr>
          </thead>
          <tbody>
            {patients &&
              patients.map((patient) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={patient._id}
                >
                  {patient.middle_name ? (
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {patient.first_name} {patient.middle_name}{" "}
                      {patient.last_name}
                    </td>
                  ) : (
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {patient.first_name} {patient.last_name}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    {new Date(patient.date_of_birth).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td>
                    <Link
                      className="font-medium text-blue-600 hover:underline"
                      to={`/patient/${patient._id}`}
                    >
                      Click for more info
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
