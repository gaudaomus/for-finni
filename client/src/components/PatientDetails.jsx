import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState([]);
  const [cookies, removeCookie] = useCookies([]);
  const { id } = useParams();
  const {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    addresses,
    comments,
  } = patientDetails;

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/account/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );
      const { status } = data;
      if (!status) {
        return (removeCookie("token"), navigate("/account/login"));
      } else {
        getPatientDetails();
      }
    };

    const getPatientDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/patient/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      data ? setPatientDetails(data) : navigate("/patient/list");
    };

    verifyCookie();
  }, [id, navigate, cookies, removeCookie]);

  return (
    <div className="w-[50vw]">
      <div className="flex justify-between px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Patient Information
        </h3>
        <Link
          className="flex-inline justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to={`/patient/${patientDetails._id}/update`}
        >
          Edit
        </Link>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {first_name}
              {middle_name ? ` ${middle_name}` : " "} {last_name}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(
                new Date(date_of_birth).getTime() +
                  new Date().getTimezoneOffset() * 60 * 1000
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Addresses
            </dt>
            <ol className="list-decimal">
              {addresses &&
                addresses.map((address) => (
                  <li className="mt-1 text-sm leading-6 text-gray-700 ml-4 sm:col-span-2 sm:mt-0">
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.zip_code}
                  </li>
                ))}
            </ol>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Comments
            </dt>
            <ul className="list-disc">
              {comments &&
                comments.map((comment) => (
                  <li className="mt-1 text-sm leading-6 text-gray-700 ml-4 sm:col-span-2 sm:mt-0">
                    {comment.comment}
                  </li>
                ))}
            </ul>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PatientDetails;
