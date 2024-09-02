import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  retrieveStudentApi,
  updateStudentApi,
  createStudentApi,
} from "./api/StudentsApiService";
import { useAuth } from "./security/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style/StudentApp.css";

export default function StudentManageComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();

  // data
  const [name, setName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");

  useEffect(() => retrieveStudent(), [id]);

  function retrieveStudent() {
    if (id !== -1) {
      retrieveStudentApi(id)
        .then((response) => {
          setName(response.data.name);
          setContactDetails(response.data.contactDetails);
          setAddress(response.data.address);
          setPinCode(response.data.pinCode);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    const student = {
      id: values.id,
      name: values.name,
      contactDetails: values.contactDetails,
      address: values.address,
      pinCode: values.pinCode,
    };
    console.log(student)
    if (id == -1) {
      createStudentApi(student)
        .then((response) => navigate("/students"))
        .catch((error) => console.log(error));
    } else {
      updateStudentApi(id, student)
        .then(() => navigate("/students"))
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {};

    if (values.name.length < 5) {
      errors.name = "Enter at least 5 characters";
    }
    if (values.contactDetails.length < 10) {
      errors.contactDetails = "Enter correct contact details";
    }
    if (values.address.length < 1) {
      errors.address = "Enter a valid address";
    }
    if (values.pinCode.length < 6) {
      errors.pinCode = "Enter at least 6 characters";
    }

    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Student Details</h1>
      <div>
        <Formik
          initialValues={{ name, contactDetails, address, pinCode }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {() => (
            <Form className="row">
              <div className="col-md-6">
                <fieldset className="form-group">
                  <label>Name</label>
                  <Field type="text" className="form-control" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label>Contact Details</label>
                  <Field
                    type="text"
                    className="form-control"
                    name="contactDetails"
                  />
                  <ErrorMessage
                    name="contactDetails"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="col-md-6">
                <fieldset className="form-group">
                  <label>Address</label>
                  <Field type="text" className="form-control" name="address" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label>Pin Code</label>
                  <Field type="text" className="form-control" name="pinCode" />
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>
              </div>

              <div className="col-12 text-center">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}