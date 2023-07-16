import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState([]);
  const [cookies, removeCookie] = useCookies([]);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    addresses,
    comments,
  } = patientDetails;

  const handleError = (err) => console.log(err);
  const handleSuccess = (msg) => console.log(msg);

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
        return removeCookie("token"), navigate("/account/login");
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

  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/patient/${id}/delete`,
        {},
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/patient/list");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    if (isEdit) {
      const { name, value } = e.target;
      setPatientDetails({
        ...patientDetails,
        [name]: value,
      });
    }
  };

  const handleOnChangeAddress = (e) => {
    if (isEdit) {
      const { name, value } = e.target;
      let addressesCopy = [...addresses];
      addressesCopy[parseInt(name)] = value;
      setPatientDetails({
        ...patientDetails,
        addresses: addressesCopy,
      });
    }
  };

  const handleOnChangeComment = (e) => {
    if (isEdit) {
      const { name, value } = e.target;
      let commentsCopy = [...comments];
      commentsCopy[parseInt(name)] = value;
      setPatientDetails({
        ...patientDetails,
        comments: commentsCopy,
      });
    }
  };

  const addAddress = () => {
    if (isEdit) {
      setPatientDetails({
        ...patientDetails,
        addresses: addresses.concat(""),
      });
    }
  };

  const deleteAddress = async (e) => {
    if (isEdit) {
      const { name } = e.target;
      let addressesCopy = [...addresses];
      addressesCopy.splice(parseInt(name), 1);
      setPatientDetails({
        ...patientDetails,
        addresses: addressesCopy,
      });
    }
  };

  const addComment = () => {
    if (isEdit) {
      setPatientDetails({
        ...patientDetails,
        comments: comments.concat(""),
      });
    }
  };

  const deleteComment = async (e) => {
    if (isEdit) {
      const { name } = e.target;
      let commentsCopy = [...comments];
      commentsCopy.splice(parseInt(name), 1);
      setPatientDetails({
        ...patientDetails,
        comments: commentsCopy,
      });
    }
  };

  const handleUpdate = async (e) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/patient/${id}/update`,
        {
          ...patientDetails,
          addresses: addresses.filter((address) => address.length > 0),
          comments: comments.filter((comment) => comment.length > 0),
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setPatientDetails({
      ...patientDetails,
      addresses: addresses.filter((address) => address.length > 0),
      comments: comments.filter((comment) => comment.length > 0),
    });
  };

  return (
    <div className="sm:w-full sm:max-w-4xl mt-10">
      <div className="flex justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Patient Information
          </h3>
        </div>
        <div>
          <button
            className="flex-inline justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={function (e) {
              if (isEdit) {
                handleUpdate(e);
              }
              setIsEdit(!isEdit);
            }}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
          {isEdit && (
            <button
              className="flex-inline justify-center rounded-md bg-red-600 px-3 py-1.5 ml-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={function () {
                window.location.reload(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            required
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="middle_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Middle name
          </label>
          <input
            type="text"
            name="middle_name"
            value={middle_name}
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            required
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="date_of_birth"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date of birth
          </label>
          <div className="sm:col-span-2 grid place-items-center [grid-template-areas:'stack']">
            <div className="[grid-area:stack] w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              {new Date(
                new Date(date_of_birth).getTime() +
                  new Date().getTimezoneOffset() * 60 * 1000
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div class="[grid-area:stack] relative left-12">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            {isEdit && (
              <input
                type="date"
                name="date_of_birth"
                value={date_of_birth}
                required
                onChange={handleOnChange}
                className="[grid-area:stack] py-0 z-50 opacity-0 relative right-2"
              />
            )}
          </div>
        </div>
      </div>

      <div className="sm:col-span-full">
        <label
          htmlFor="addresses"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Addresses
        </label>
        {addresses &&
          addresses.map((address, index) => (
            <div className="flex">
              <input
                name={index}
                value={address}
                type="text"
                onChange={handleOnChangeAddress}
                className="block w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button name={index} onClick={deleteAddress} className="ml-3 pb-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        <div className="flex justify-end pt-1.5">
          <button
            className="flex-inline justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addAddress}
          >
            Add address
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="addresses"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Comments
        </label>
        {comments &&
          comments.map((comment, index) => (
            <div className="flex">
              <input
                name={index}
                value={comment}
                type="text"
                onChange={handleOnChangeComment}
                className="block w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button name={index} onClick={deleteComment} className="ml-3 pb-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        <div className="flex justify-end py-1.5">
          <button
            onClick={addComment}
            className="flex-inline justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add comment
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-md bg-red-600 px-3 py-1.5 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={handleDelete}
        >
          Delete profile
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
