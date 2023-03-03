import "./featured.css";

export default function Featured(props) {
  return (
    <div className="featured">
      <div className="allfeatured">
        <div className="featured-info">
          <img
            src={`../images/${props.coverImg} `}
            alt={""}
            className="featured-img"
          />
          <div className="featured-items">
            <p className="title">{props.title}</p>
            <div className="featured-rev">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <p className="revnum">{props.reviewnum}</p>
            </div>
            <p className="featured-price">{props.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
