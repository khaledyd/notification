import "./cate.css";

export default function Cate(props) {
  return (
    <div className="cate">
      <div className="case-items">
        <div className="cate-info">
        <img
            src={`../images/${props.thImg} `}
            alt={""}
            className="featured-img"
          />
          <p className="cate-info-title">{props.title1}</p>
        </div>
      </div>
    </div>
  );
}
