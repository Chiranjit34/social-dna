import React, { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import { api } from "../api";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    //console.log(user);
    try {
      const result = (await axios.post(`${api}/api/users/login`, user));
      console.log(result.data);
      localStorage.setItem("currentUser", JSON.stringify(result));
      localStorage.setItem("tokenStore", result.data.token);
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
    setLoading(false);
  }
  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error.length > 0 && <Error msg={error} />}
          <div className="bs">
            <h2>Login</h2>

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
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {loading ? (
              <div>Login...Please Wait...</div>
            ) : (
              <button className="btn btn-primary mt-3" onClick={Login}>
                Login
              </button>
            )}
            <p className="mt-3">
              Don't have an account?{" "}
              <span
                className="com"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
