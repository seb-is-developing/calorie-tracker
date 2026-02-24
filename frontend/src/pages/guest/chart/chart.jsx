import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import ExceededCalories from "../../../components/exceededCalories";
import "../chart/chart.css";

export default function Chart() {
  const userData = useSelector((state) => state.bodyStats);

  const totalCalories = () => {
    const { age, height, weight, totalExercise, gender } = userData;

    const bmr =
      weight * 10 + 6.25 * height - 5 * age + (gender === "female" ? -161 : 5);

    const activityMultiplier =
      totalExercise === "veryLittle"
        ? 1.2
        : totalExercise === "light"
          ? 1.375
          : totalExercise === "moderate"
            ? 1.55
            : totalExercise === "active"
              ? 1.725
              : 1.2;

    return bmr * activityMultiplier - 300;
  };

  return (
    <div className="chart-background">
      <div className="chart-card">
        <div className="chart-title">Target Calories</div>
        <div className="pie-container">
          <PieChart
            width={300}
            height={300}
            series={[
              {
                data: pieData,
                innerRadius: 90,
                outerRadius: 120,
              },
            ]}
          />
          {userData.bodyStats && (
            <div className="pie-center-text">
              <strong>{remainingCalories}</strong>
              <span>kcal</span>
            </div>
          )}
        </div>
      </div>
      <ExceededCalories remainingCalories={remainingCalories} />
    </div>
  );
}
