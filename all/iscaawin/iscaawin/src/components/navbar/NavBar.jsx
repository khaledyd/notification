import "./navbar.css";



export default function navbar() {
  return (
    <div className="navbar">
      <div className="nav">
        <div class="logo">
          <img className="img1" src="./iamges/Logo.png" alt="" />
          <h3>Is caawin</h3>
          <ul class="navitems">
            <li className="navitem">Home</li>
            <li className="navitem">About</li>
            <li className="navitem">Contact us</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
