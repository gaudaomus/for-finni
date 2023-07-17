import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { v4 } from "uuid";

const PatientCreate = ({ isUpdate }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [inputValue, setInputValue] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: undefined,
    addresses: [{ id: v4(), street: "", city: "", state: "", zip_code: "" }],
    comments: [],
  });
  const { id } = useParams();
  const {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    addresses,
    comments,
  } = inputValue;

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
      } else if (isUpdate) {
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
      data ? setInputValue(data) : navigate("/patient/list");
    };

    verifyCookie();
  }, [navigate, cookies, removeCookie, id, isUpdate]);

  const handleError = (err) => console.log(err);
  const handleSuccess = (msg) => console.log(msg);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleOnChangeAddress = (e) => {
    const { id, name, value } = e.target;
    let addressesCopy = [...addresses];
    addressesCopy.find((address) => address.id === id)[name] = value;
    setInputValue({
      ...inputValue,
      addresses: addressesCopy,
    });
  };

  const addAddress = (e) => {
    e.preventDefault();
    setInputValue({
      ...inputValue,
      addresses: addresses.concat({
        id: v4(),
        street: "",
        city: "",
        state: "",
        zip_code: "",
      }),
    });
  };

  const deleteAddress = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    setInputValue({
      ...inputValue,
      addresses: addresses.filter((address) => address.id !== id),
    });
  };

  const handleOnChangeComment = (e) => {
    const { id, value } = e.target;
    let commentsCopy = [...comments];
    commentsCopy.find((comment) => comment.id === id).comment = value;
    setInputValue({
      ...inputValue,
      comments: commentsCopy,
    });
  };

  const addComment = (e) => {
    e.preventDefault();
    setInputValue({
      ...inputValue,
      comments: comments.concat({ id: v4(), comment: "" }),
    });
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    setInputValue({
      ...inputValue,
      comments: comments.filter((comment) => comment.id !== id),
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:4000/patient/${id}/update`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate(`/patient/${id}`);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/patient/create",
        {
          ...inputValue,
        },
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

  return (
    <form
      onSubmit={isUpdate ? handleUpdate : handleSubmit}
      className="sm:w-full sm:max-w-4xl"
    >
      <div className="space-y-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Create a new patient profile
        </h2>
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
                {date_of_birth
                  ? new Date(
                      new Date(date_of_birth).getTime() +
                        new Date().getTimezoneOffset() * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select date"}
              </div>
              <div className="[grid-area:stack] relative left-12">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                name="date_of_birth"
                value={date_of_birth}
                onChange={handleOnChange}
                className="[grid-area:stack] py-0 z-50 opacity-0 relative right-2"
              />
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
          <div className="divide-y divide-gray-300">
            {addresses.map((address, index) => (
              <div className="flex py-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="street"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Street
                    </label>
                    <input
                      id={address.id}
                      name="street"
                      value={address.street}
                      type="text"
                      required
                      onChange={handleOnChangeAddress}
                      className="w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <input
                      id={address.id}
                      name="city"
                      value={address.city}
                      type="text"
                      required
                      onChange={handleOnChangeAddress}
                      className="w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="state"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </label>
                    <input
                      id={address.id}
                      name="state"
                      value={address.state}
                      type="text"
                      required
                      onChange={handleOnChangeAddress}
                      className="block w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="zip_code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Zip Code
                    </label>
                    <input
                      id={address.id}
                      name="zip_code"
                      value={address.zip_code}
                      type="text"
                      required
                      onChange={handleOnChangeAddress}
                      className="block w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    id={address.id}
                    onClick={deleteAddress}
                    className="pt-4 sm:col-span-1 mt-3.5 ml-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 pointer-events-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-1.5">
            <button
              className="flex-inline justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={addAddress}
            >
              Add address
            </button>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="addresses"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Comments
        </label>
        {comments.map((comment) => (
          <div className="flex">
            <input
              id={comment.id}
              name="comment"
              value={comment.comment}
              type="text"
              required
              onChange={handleOnChangeComment}
              className="block w-full rounded-md border-0 py-1.5 mb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              id={comment.id}
              onClick={deleteComment}
              className="ml-3 pb-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 pointer-events-none"
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
      <div className="flex justify-around mt-8">
        <button
          type="submit"
          className="flex w-3/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isUpdate ? "Update" : "Create"}
        </button>
        <Link
          to={isUpdate ? `/patient/${id}` : "/patient/list"}
          className="flex w-3/12 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Cancel
        </Link>
      </div>
      {isUpdate && (
        <div className="flex justify-end">
          <button
            className="rounded-md w-3/12 bg-red-600 px-3 py-1.5 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleDelete}
          >
            Delete profile
          </button>
        </div>
      )}
    </form>
  );
};

export default PatientCreate;
