import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "./NavBar";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
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
      const { status, user } = data;
      setUsername(user);
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
      data ? setPatientDetails(data) : navigate("/patient");
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
          navigate("/patient");
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
    <div className="grid justify-items-center">
      <NavBar username={username} />
      <button
        onClick={function () {
          navigate("/patient");
        }}
      >
        Home
      </button>
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
      {isEdit && (
        <button
          onClick={function () {
            window.location.reload(false);
          }}
        >
          Cancel
        </button>
      )}
      <div>
        <input
          name="first_name"
          value={first_name}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <input
          name="middle_name"
          value={middle_name}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <input
          name="last_name"
          value={last_name}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <div>
        {new Date(
          new Date(date_of_birth).getTime() +
            new Date().getTimezoneOffset() * 60 * 1000
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <input
          name="date_of_birth"
          value={date_of_birth}
          type="date"
          onChange={handleOnChange}
        />
      </div>
      <div>
        {addresses &&
          addresses.map((address, index) => (
            <div>
              <input
                name={index}
                value={address}
                type="text"
                onChange={handleOnChangeAddress}
              />
              <button name={index} onClick={deleteAddress}>
                X
              </button>
            </div>
          ))}
        <button onClick={addAddress}>Add address</button>
      </div>
      <div>
        {comments &&
          comments.map((comment, index) => (
            <div>
              <input
                name={index}
                value={comment}
                type="text"
                onChange={handleOnChangeComment}
              />
              <button name={index} onClick={deleteComment}>
                X
              </button>
            </div>
          ))}

        <button onClick={addComment}>Add comment</button>
      </div>
    </div>
  );
};

export default PatientDetails;
