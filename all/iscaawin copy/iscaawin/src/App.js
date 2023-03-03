import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Nav from "./components/nav/Nav";
import data from "./data";
import Featured from "./components/featured/Featured";
import Featuredt from "./components/featuredt/Featuredt";
import data1 from "./data1";
import Cate from "./components/cate/Cate";
import Catet from "./components/catet/Catet";
import Review from "./components/review/Review";
import data2 from "./data2";
import Reviewt from "./components/reviewt/Reviewt";
import Headertwo from "./components/headertwo/Headertwo";
import Foot from "./components/footer/Foot";
function App() {
  const Thefeatured = data.map((item) => {
    return <Featured key={item.id} {...item} />;
  });
  const Thecate = data1.map((item) => {
    return <Cate key={item.id} {...item} />;
  });
  const Thereview = data2.map((item) => {
    return <Review key={item.id} {...item} />;
  });


  return (
    <div className="App">
      <Nav />
      <Header />
      <Hero />

      <div className="featured">{Thefeatured}</div>
      <Featuredt />
      <div className="cate">{Thecate}</div>
      <Catet/>
      <div className="review-allinfo">
        {Thereview}
      </div>
      <Reviewt/>
      <Headertwo/>
      <Foot/>
    </div>

  );
}

export default App;
