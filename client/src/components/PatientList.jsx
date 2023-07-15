import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const PatientList = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
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
      const { status } = data;
      if (!status) {
        return (removeCookie("token"), navigate("/account/login"));
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
  }, [cookies, removeCookie, navigate]);

  return (
    <div className="grid justify-items-center w-screen">
      <div className="relative overflow-x-auto shadow-md rounded-lg w-9/12">
        <div className="pb-4 bg-white flex justify-around">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div className="relative w-8/12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
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
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
          <button
            className="px-2 text-sm text-white bg-blue-600 hover:bg-blue-700 hover:border-gray-300 border rounded-lg"
            onClick={function () {
              navigate("/patient/create");
            }}
          >
            Add patient
          </button>
        </div>
        <table className="text-sm text-left text-gray-500 w-full">
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
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {patient.first_name} {patient.middle_name}{" "}
                      {patient.last_name}
                    </td>
                  ) : (
                    <td className="px-6 py-4 font-medium text-gray-900">
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
