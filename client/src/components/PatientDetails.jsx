import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    date_of_birth_formatted,
    address,
    comments,
  } = patientDetails;

  const handleError = (err) => console.log(err);
  const handleSuccess = (msg) => console.log(msg);

  useEffect(() => {
    const getPatientDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/patient/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      data ? setPatientDetails(data) : navigate("/");
    };
    getPatientDetails();
  }, [id, navigate]);

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
          navigate("/");
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:4000/patient/${id}/update`,
        {
          ...patientDetails,
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
    });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={function (e) {
          if (isEdit) {
            handleUpdate(e);
          }
          setIsEdit(!isEdit);
        }}
      >
        {isEdit ? "Save" : "Edit"}
      </button>
      <div>
        <input
          name="first_name"
          value={first_name}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <div>
        {patientDetails.date_of_birth_formatted}
        <input
          name="date_of_birth"
          value={date_of_birth}
          type="date"
          onChange={handleOnChange}
        />
      </div>
      <div>
        {patientDetails.address && (
          <ul>
            {patientDetails.address.map((address) => (
              <li>{address}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {patientDetails.comments && (
          <ul>
            {patientDetails.comments.map((comment) => (
              <li>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
