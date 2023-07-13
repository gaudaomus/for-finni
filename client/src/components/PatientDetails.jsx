import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getPatientDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/patient/${id}`,
        {},
        { withCredentials: true }
      );
      setPatientDetails(data);
    };
    getPatientDetails();
  }, []);
  return (
    <div>
      <div>
        {patientDetails.first_name} {patientDetails.last_name}
      </div>
      <div>{patientDetails.date_of_birth_formatted}</div>
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
