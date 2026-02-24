import { useSelector, useDispatch } from "react-redux";
import "../../bodyStats/dashboard.css";

export default function GuestDashBoard() {
  const dispatch = useDispatch();
  const bodyStats = useSelector((state) => state.bodyStats);

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
            value={userMeasurements.age}
            onChange={handleChange}
          />
          <label className="measurement-label">HEIGHT(CM)</label>
          <input
            className="measurement-input"
            name="height"
            type="number"
            min="100"
            max="250"
            value={userMeasurements.height}
            onChange={handleChange}
          />
          <label className="measurement-label">WEIGHT(KG)</label>
          <input
            className="measurement-input"
            name="weight"
            type="number"
            value={userMeasurements.weight}
            onChange={handleChange}
          />

          <label className="measurement-label">Amount of Exercise</label>
          <select
            className="measurement-input"
            name="totalExercise"
            value={userMeasurements.totalExercise}
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
            value={userMeasurements.gender}
            onChange={handleChange}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <button
            className="user-details-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {submitError && <p className="error">{submitError}</p>}
          {submitSuccess && <p className="success">{submitSuccess}</p>}
        </form>
      </div>
    </>
  );
}
