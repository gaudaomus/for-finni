import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
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
    getPatients();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>More Details</th>
        </thead>
        <tbody>
          {patients &&
            patients.map((patient) => (
              <tr key={patient._id}>
                {patient.middle_name ? (
                  <td>
                    {patient.first_name} {patient.middle_name}{" "}
                    {patient.last_name}
                  </td>
                ) : (
                  <td>
                    {patient.first_name} {patient.last_name}
                  </td>
                )}
                <td>
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
                  <Link to={`/${patient._id}`}>Click for more info</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
