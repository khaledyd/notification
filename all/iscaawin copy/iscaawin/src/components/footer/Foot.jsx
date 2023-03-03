import "./foot.css";

export default function Foot() {
  return (
    <div className="foot">
      <div className="foot-items">
        <div className="foot-items-info1">
          <p className="foot-title">categories</p>
          <ul className="foot-list">
            <li className="foot-lists">men clothings</li>
            <li className="foot-lists">women clothings</li>
            <li className="foot-lists">men shoes</li>
            <li className="foot-lists">women shoes</li>
          </ul>
        </div>



        <div className="foot-items-info2">
          <p className="foot-title1">services</p>
          <ul className="foot-list1">
            <li className="foot-lists1">refund</li>
            <li className="foot-lists1">free shippings</li>
          </ul>
        </div>

        <div className="foot-items-info3">
          <p className="foot-title2">products</p>
          <ul className="foot-list2">
            <li className="foot-lists2">clothings</li>
            <li className="foot-lists2">shoes</li>
          </ul>
        </div>
        <div className="contacts">
            <p className="contacts">contacts</p>
            <div className="contacts-icon">
            <i class="fa-brands fa-facebook-square"></i>
            <i class="fa-brands fa-instagram-square"></i>
            <i class="fa-brands fa-twitter-square"></i>
            <i class="fa-brands fa-tiktok"></i>

            </div>
        </div>
        <h6 className="copy">© Copyright 2022 cusbo. All rights reserved.</h6>


      </div>
    </div>
  );
}
