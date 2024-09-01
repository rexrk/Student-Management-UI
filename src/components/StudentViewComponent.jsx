import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { retrieveStudentApi } from "./api/StudentsApiService";
import "./style/StudentApp.css";

export default function StudentViewComponent() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State variables for student data
  const [studentData, setStudentData] = useState({
    name: "",
    contactDetails: "",
    address: "",
    pinCode: ""
  });

  useEffect(() => {
    retrieveStudent();
  }, [id]);

  function retrieveStudent() {
    retrieveStudentApi(id)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleEdit() {
    navigate(`/student-manage/${id}`);
  }

  return (
    <div className="container">
      <h1>Student Details</h1>
      <div className="row">
        <div className="col-md-6">
          <fieldset className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={studentData.name}
              disabled
            />
          </fieldset>

          <fieldset className="form-group">
            <label>Contact Details</label>
            <input
              type="text"
              className="form-control"
              value={studentData.contactDetails}
              disabled
            />
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={studentData.address}
              disabled
            />
          </fieldset>

          <fieldset className="form-group">
            <label>Pin Code</label>
            <input
              type="text"
              className="form-control"
              value={studentData.pinCode}
              disabled
            />
          </fieldset>
        </div>

        <div className="col-12 text-center">
          <button
            type="button"
            onClick={handleEdit}
            className="btn btn-primary"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
