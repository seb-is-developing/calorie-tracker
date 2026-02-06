import { useState } from "react";
import { updateBodyStats } from "../../api/api";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import pathConfig from "../../route/config.json";

export default function Dashboard() {
  const [userMeasurements, setUserMeasurements] = useState({
    age: "",
    height: "",
    weight: "",
    totalExercise: "veryLittle",
    gender: "male",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toNumberOrUndefined = (value) => {
    if (value === "") return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setSubmitError("You must be logged in to update body stats.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        age: toNumberOrUndefined(userMeasurements.age),
        height: toNumberOrUndefined(userMeasurements.height),
        weight: toNumberOrUndefined(userMeasurements.weight),
        gender: userMeasurements.gender,
        totalExercise: userMeasurements.totalExercise,
      };
      await updateBodyStats(payload, token);
      setSubmitSuccess("Body stats updated successfully.");
      navigate(pathConfig.chart);
    } catch (error) {
      setSubmitError(error.message || "Failed to update body stats");
    } finally {
      setIsSubmitting(false);
    }
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
            value={userMeasurements.age}
            onChange={handleChange}
          />
          <label className="measurement-label">HEIGHT(CM)</label>
          <input
            className="measurement-input"
            name="height"
            type="number"
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
