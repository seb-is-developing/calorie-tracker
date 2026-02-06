import { getMe } from "../../api/api";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./chart.css";
export default function Chart() {
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
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
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

  const pieData = [
    {
      id: 0,
      value: targetCalories,
      color: "rgb(62, 219, 0)",
    },
  ];

  return (
    <div className="chart-background">
      <div>
        <p>some text</p>
      </div>

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
          hideLegend
        />
        {userData.bodyStats && (
          <div className="pie-center-text">
            <strong>{targetCalories}</strong>
            <span>kcal</span>
          </div>
        )}
      </div>
    </div>
  );
}
