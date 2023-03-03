import "./nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="navbar">
        <img className="logo" src="./images/Cusbo (1).png" alt=""></img>
        <ul className="navbar-list">
          <li className="navbar-list-item">Home</li>
          <li className="navbar-list-item">Products</li>
          <li className="navbar-list-item">Categories</li>
          <li className="navbar-list-item">Arivals</li>
        </ul>
        <div className="navbar-buton">
          <i class="fa-solid fa-user"></i>
          <i class="fa-solid fa-cart-shopping"></i>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
}
