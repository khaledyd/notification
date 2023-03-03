import "./review.css";

export default function Review(props) {
  return (
    <div className="review">
      <div className="review-allinfo">
        <div className="review-info">
          <img
            src={`../images/${props.thImg1}`}
            alt={""}
            className="review-img"
          />
          <div className="box-1">
            <p className="review-title">{props.title2}</p>
            <div className="review-stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p className="review-desc">{props.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
