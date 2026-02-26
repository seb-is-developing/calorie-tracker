import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import ExceededCalories from "../../../components/exceededCalories";
import "../../userTracking/calorie-chart/chart.css";

export default function GuestChart() {
  const userData = useSelector((state) => state.bodyStats);
  const consumedCalories = useSelector(
    (state) => state.consumedCalories.consumedCalories,
  );
  const exerciseCalories = useSelector(
    (state) => state.exercise.amountOfExercise,
  );

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

  const userCalories = Math.round(totalCalories());
  const consumedTotalCal = consumedCalories.reduce(
    (sum, item) => sum + item.calories,
    0,
  );
  const exerciseTotalCal = exerciseCalories.reduce(
    (sum, item) => sum + item.calories,
    0,
  );
  const remainingCalories = userCalories - consumedTotalCal + exerciseTotalCal;

  const pieData = [
    {
      id: 0,
      value: remainingCalories,
      color: "rgb(62, 219, 0)",
      label: "Target Calories",
    },
    {
      id: 1,
      value: consumedTotalCal,
      color: "rgb(219, 62, 0)",
      label: "Consumed Calories",
    },
    {
      id: 2,
      value: exerciseTotalCal,
      color: "rgb(0, 62, 219)",
      label: "Exercise Calories",
    },
  ];

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
          {userData && (
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
