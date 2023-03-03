import { Link } from "react-router-dom";
import "./login.css";
export default function Login() {
  return (
    <div className="login">
      <span className="loginTitle">log in</span>
      <form a className="loginForm">
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
        />
        <button className="loginButton">login</button>
      </form>
      <button className="loginRegisterButton">
      <Link className="link" to={"/Register"}>REGISTER</Link>
      </button>
    </div>
  );
}
