import { useState } from "react";
import { useHistory } from "react-router";

// import axios from "axios";
import requests from "../utils/requests";
export default function LoginPageComp() {
  const [user, setUser] = useState({ userName: "", pwd: "" });
  const [message, setMessage] = useState();
  const history = useHistory();

  const getUser = async (e) => {
    e.preventDefault();
    const resp = await requests.post(
      "http://localhost:8080/api/auth/login",
      user
    );
    if (resp.data.hasOwnProperty("message")) {
      setMessage(resp.data.message);
    } else if (resp.data.loginSuccess) {
      history.push("/home");
      sessionStorage.setItem("userName", resp.data.user.fullName);
      setMessage("");
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "15% auto 0 auto",
        }}
      >
        <h1>Welcome to Series App</h1>
        <form onSubmit={(e) => getUser(e)}>
          <h3>Please Login</h3>
          <input
            type="text"
            placeholder="user name"
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, pwd: e.target.value })}
          />
          <br />
          <input type="submit" value="Login" />
          {message !== "" ? <h4>{message}</h4> : null}
        </form>
      </div>
    </div>
  );
}
