import { useSelector, useDispatch } from "react-redux";
import { setBodyStatsActions } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import "../../bodyStats/dashboard.css";
import pathConfig from "../../../route/config.json";
export default function GuestDashBoard() {
  const dispatch = useDispatch();
  const bodyStats = useSelector((state) => state.bodyStats);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setBodyStatsActions.setBodyStats({ ...bodyStats, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(pathConfig.guestTracking);
  };

  return (
    <>
      <div className="user-details">
        <form className="measurement-form" onSubmit={handleSubmit}>
          <h1 className="measurement-title">TIME TO START</h1>
          <label className="measurement-label">AGE</label>
          <input
            className="measurement-input"
            name="age"
            type="number"
            value={bodyStats.age || ""}
            onChange={handleChange}
          />
          <label className="measurement-label">HEIGHT(CM)</label>
          <input
            className="measurement-input"
            name="height"
            type="number"
            min="100"
            max="250"
            value={bodyStats.height || ""}
            onChange={handleChange}
          />
          <label className="measurement-label">WEIGHT(KG)</label>
          <input
            className="measurement-input"
            name="weight"
            type="number"
            value={bodyStats.weight || ""}
            onChange={handleChange}
          />

          <label className="measurement-label">Amount of Exercise</label>
          <select
            className="measurement-input"
            name="totalExercise"
            value={bodyStats.totalExercise}
            onChange={handleChange}
          >
            <option value="veryLittle">Very Little (0)</option>
            <option value="light">Light (1-3) </option>
            <option value="moderate">Moderate (3-5) </option>
            <option value="active">Very Active (6-7) </option>
          </select>
          <label className="measurement-label">GENDER</label>
          <select
            className="measurement-input"
            name="gender"
            value={bodyStats.gender}
            onChange={handleChange}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <button className="user-details-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
