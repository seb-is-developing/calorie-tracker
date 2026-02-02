import { useNavigate } from "react-router-dom";
import pathConfig from "../../../route/config.json";
import "./Home.css";
import food from "../../../images/stock.jpg";

export default function HeroSection() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(pathConfig.signUp);
  };
  return (
    <div className="hero-section">
      <div className="text">
        <div className="description">
          <p>
            Take control of your health with easy and accurate nutrition
            tracking. Monitor your meals, set goals, and track your progress to
            make informed, healthier choices every day.
          </p>
          <button onClick={handleClick} className="button-register">
            READY!
          </button>
        </div>
      </div>
      <div className="image">
        <div className="hero-image">
          <img className="food-image" src={food} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
