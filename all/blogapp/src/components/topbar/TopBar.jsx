import { Link } from "react-router-dom";
import "./topbar.css";
export default function topBar() {
  const currentUser = false;
  return (
    <div className='top'>
      <div className="topLeft">
      <i className="topIcon fa-brands fa-facebook-square"></i>
      <i className=" topIcon fa-brands fa-twitter-square"></i>
      <i className="topIcon fa-brands fa-pinterest-square"></i>
      <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ui className="toplist">
  
          <li className="TopListItem"> <Link className="link" to={"/"}>HOME</Link></li>
          <li className="TopListItem"><Link className="link" to={"/ABOUT"}>ABOUT</Link></li>
          <li className="TopListItem"><Link className="link" to={"/CONTACT"}>CONTACT</Link></li>
          <li className="TopListItem"><Link className="link" to={"/Write"}>WRITE</Link></li>
          <li className="TopListItem">
            {currentUser&&"LOGOUT"}</li>

          
        </ui>
      </div>
      <div className="topRight">
        {
          currentUser ? (
            <img className="topImg" src="https://images.pexels.com/photos/11643608/pexels-photo-11643608.jpeg?cs=srgb&dl=pexels-jonathan-cooper-11643608.jpg&fm=jpg" alt=""  />
          ): (
            <ul className="toplist">
  
            <li className="TopListItem"><Link className="link" to={"/login"}>LOGIN</Link></li>
            <li className="TopListItem"><Link className="link" to={"/register"}>REGISTER</Link></li>
            </ul>
            
          )
        }
      
      
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
      </div>
  )
}