import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudentApi } from "./api/AuthenticationApiService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style/StudentApp.css";

export default function StudentManageComponent() {
  const navigate = useNavigate();

  // data
  const [name, setName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  function onSubmit(values) {
    const student = {
      name: values.name,
      contactDetails: values.contactDetails,
      address: values.address,
      pinCode: values.pinCode,
      username: values.username,
      password: values.password,
      role: "STUDENT",
    };
    console.log(student);

    createStudentApi(student)
      .then(() => {
        alert("Registered")
        navigate("/login")
      })
      .catch((error) => console.log(error));
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
    if (values.username.length < 5) {
      errors.username = "Enter alteast 5 chars";
    }
    if (values.password.length < 5) {
      errors.password = "Enter atleast 5 chars";
    }

    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Student Details</h1>
      <div>
        <Formik
          initialValues={{
            name,
            contactDetails,
            address,
            pinCode,
            username,
            password,
            role,
          }}
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
                  <label>Username</label>
                  <Field type="text" className="form-control" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

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
                  <label>Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </fieldset>

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
                <button className="btn btn-info m-2" type="submit">
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
