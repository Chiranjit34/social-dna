import React, { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { api } from "../api";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      //console.log(user);
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const result = (await axios.post(`${api}/api/users/register`, user));
        console.log(result.data);
        setSuccess(result.data);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      alert("Password not matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error.length > 0 && <Error msg={error} />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success.length > 0 && <Success msg={success} />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            {loading ? (
              <div>Registering... Please Wait...</div>
            ) : (
              <button className="btn btn-primary mt-3" onClick={register}>
                Register
              </button>
            )}
            <p className="mt-3">
              Have an account?{" "}
              <span
                className="com"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
