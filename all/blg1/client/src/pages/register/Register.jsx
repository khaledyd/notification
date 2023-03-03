import { Link } from "react-router-dom"
import "./register.css"
export default function Register() {
  return (
    <div className="register">
      <span className="registerTitle">register</span>
    <form a
     className="registerForm">
      
      <label>username</label>
      <input type="text" className="registerInput" placeholder="Enter your username..." />
      <label>Email</label>
      <input type="text" className="registerInput" placeholder="Enter your email..." />
      <label>Password</label>
      <input type="password" className="registerInput" placeholder="Enter your password..." />
      <button className="registerButton">register</button>
     </form>
     <button className="registerLoginButton">
     <Link className="link" to={"/Login"}>LOGIN</Link>
     </button>
    
    </div>
  )
}
