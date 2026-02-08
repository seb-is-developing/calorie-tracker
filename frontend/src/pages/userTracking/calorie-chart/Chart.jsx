import { getMe } from "../../../api/api";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./chart.css";
export default function Chart({ user }) {
  const [userData, setUserData] = useState(null);
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsloading(true);
      try {
        const data = await getMe();
        setUserData(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsloading(false);
      }
    };
    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div className="failed">Failed to load user data.</div>;
  }
  if (!userData.bodyStats) {
    return (
      <div className="no-body-stats">
        Please update your body stats in the dashboard to see the calorie chart.
      </div>
    );
  }

  const totalCalories = () => {
    const { weight, height, age, totalExercise, gender } = userData.bodyStats;

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

  const targetCalories = Math.round(totalCalories());

  const consumedCalories = userData.consumedCalories.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const exerciseCalories = userData.amountOfExercise.reduce(
    (sum, item) => sum + item.totalExercise,
    0,
  );

  const remainingCalories =
    targetCalories - consumedCalories + exerciseCalories;

  const pieData = [
    {
      id: 0,
      value: remainingCalories,
      color: "rgb(62, 219, 0)",
      label: "Target Calories",
    },
    {
      id: 1,
      value: consumedCalories,
      color: "rgb(219, 62, 0)",
      label: "Consumed Calories",
    },
    {
      id: 2,
      value: exerciseCalories,
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
          {userData.bodyStats && (
            <div className="pie-center-text">
              <strong>{remainingCalories}</strong>
              <span>kcal</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
