import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h4 className="header-titile">Is caawin</h4>
        <p className="headerp">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure{" "}
        </p>
      </div>
      <div className="imgh">
        <img
          src="./iamges/africa.png"
          alt=""
          className="header-img"
        />
      </div>
    </div>
  );
}
