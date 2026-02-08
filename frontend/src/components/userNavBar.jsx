import pathConfig from "../route/config.json";
import "./userNavBar.css";
import { useNavigate } from "react-router-dom";
export default function UserNavBar() {
  const navigate = useNavigate();
  return (
    <div className="user-nav-bar">
      <h1 className="user-nav-title">CALORIE TRACKER</h1>
      <button
        className="logout-button"
        onClick={() => navigate(pathConfig.login)}
      >
        logout
      </button>
    </div>
  );
}
