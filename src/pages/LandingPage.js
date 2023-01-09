import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="LandingPage">
      <div className="SeekYourGuitar">
        <div>Seek Your Guitar</div>
        <Link to="shop" className="button">
          Here
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
