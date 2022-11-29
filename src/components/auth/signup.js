import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    console.log("target changes", e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("https://sm-todo-list.herokuapp.com/signup", {
        email: email,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem("access_token", response.data.access_token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="signup-bg">
      <div className="card opacity-75">
        <div className="card-body">
          <h5 className="card-title text-center mb-4 fs-2">Register</h5>
          <div className="card-text">
            <div className="input-types">
              <input
                placeholder="Enter username"
                type="text"
                name="text"
                className="user-input"
                onChange={handleEmailChange}
              />

              <input
                onChange={handlePasswordChange}
                placeholder="Create your password"
                type="password"
                name="password"
                className="user-input"
              />
              <div className="text-center w-100">
              <button className="btn btn-primary m-2" onClick={handleSubmit}>
                Submit
              </button>
              <a className="btn btn-success" href='/'>
                Back
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
