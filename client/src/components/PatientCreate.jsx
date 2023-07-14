import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientCreate = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: new Date().toLocaleString,
    addresses: [],
    comments: [],
  });
  const { first_name, middle_name, last_name, date_of_birth, addresses, comments } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => console.log(err);
  const handleSuccess = (msg) => console.log(msg);

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
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: new Date().toLocaleString,
      addresses: [],
      comments: [],
    });
  };
  return (
    <div className="form_container">
      <h2>Create patient profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            placeholder="Enter first name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="middle_name">Middle name</label>
          <input
            type="text"
            name="middle_name"
            value={middle_name}
            placeholder="Enter middle name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Enter last name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            placeholder="Enter date of birth"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="addresses">Addresses</label>
          <input
            type="text"
            name="addresses"
            value={addresses}
            placeholder="Enter addresses"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="comments">Comments</label>
          <input
            type="text"
            name="comments"
            value={comments}
            placeholder="Enter comments"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientCreate;
