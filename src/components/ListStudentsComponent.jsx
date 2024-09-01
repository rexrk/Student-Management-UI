import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllStudentsApi, deleteStudentApi } from "./api/StudentsApiService";

function ListStudentsComponent() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState()

  useEffect(() => refreshStudents(), []);
  function refreshStudents() {
    retrieveAllStudentsApi()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteStudent(id) {
    console.log("clicked " + id);
    deleteStudentApi(id)
      .then(() => {
        setMessage(`Delete of student with id = ${id} successful`);
        refreshStudents();
      })
      .catch((error) => console.log(error));
  }

  function updateStudent(id) {
    console.log("clicked " + id);
    navigate(`/student-manage/${id}`);
  }

  function viewStudent(id) {
    navigate(`/student-view/${id}`);
  }

  function addNewStudent() {
    navigate(`/student-manage/-1`);
  }

  return (
    <div className="container">
      <h1>All Students!</h1>

      {message && <div className="alert alert-warning">{message}</div>}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Delete</th>
              <th>View</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>{" "}
                </td>

                <td>
                  {" "}
                  <button
                    className="btn btn-info"
                    onClick={() => viewStudent(student.id)}
                  >
                    View
                  </button>{" "}
                </td>

                <td>
                  {" "}
                  <button
                    className="btn btn-success"
                    onClick={() => updateStudent(student.id)}
                  >
                    Update
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewStudent}>
        Add New Student
      </div>
    </div>
  );
}

export default ListStudentsComponent;
