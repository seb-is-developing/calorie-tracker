import pathConfig from "../route/config.json";
import "./userNavBar.css";
import { useNavigate } from "react-router-dom";
export default function UserGuestNavBar() {
  const navigate = useNavigate();

  return (
    <div className="user-nav-bar">
      <h1 className="user-nav-title">CALORIE TRACKER</h1>
      <div>
        <button
          className="logout-button"
          onClick={() => navigate(pathConfig.home)}
        >
          Home
        </button>
        <button
          className="logout-button"
          onClick={() => navigate(pathConfig.signUp)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
