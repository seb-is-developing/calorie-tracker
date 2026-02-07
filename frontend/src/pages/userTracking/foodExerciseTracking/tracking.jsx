import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./tracking.css";
import Chart from "../calorie-chart/Chart";
import {
  getMe,
  addConsumedCalories,
  deleteConsumedCalories,
  addExerciseCalories,
  deleteExerciseCalories,
} from "../../../api/api";

export default function UserTracking() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  // Food form
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");

  // Exercise form
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");

  const refreshMe = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
      setRefreshKey((prev) => prev + 1);
    } catch (e) {
      console.error(e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMe();
  }, []);

  const onSubmitFood = async (e) => {
    e.preventDefault();
    await addConsumedCalories({
      consumedId: uuidv4(),
      name: foodName,
      total: Number(foodCalories),
    });
    setFoodName("");
    setFoodCalories("");
    await refreshMe();
  };

  const onDeleteFood = async (consumedId) => {
    await deleteConsumedCalories(consumedId);
    await refreshMe();
  };

  const onSubmitExercise = async (e) => {
    e.preventDefault();
    await addExerciseCalories({
      exerciseId: uuidv4(),
      exerciseName,
      totalExercise: Number(exerciseCalories),
    });
    setExerciseName("");
    setExerciseCalories("");
    await refreshMe();
  };

  const onDeleteExercise = async (exerciseId) => {
    await deleteExerciseCalories(exerciseId);
    await refreshMe();
  };

  if (loading && !user) return <div>Loading...</div>;
  if (!user) return <div>Please log in.</div>;

  const consumedCal = user.consumedCalories || [];
  const exercise = user.amountOfExercise || [];

  return (
    <div className="info">
      <div className="submission-info">
        <div className="sub-header-info">
          <h2>TIME TO TRACK!</h2>
        </div>

        <form onSubmit={onSubmitFood} className="info-submit">
          <div className="info-submit-scroll">
            <div className="inputFields">
              <input
                placeholder="Enter your Food"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="info-input"
                required
                maxLength={100}
              />

              <input
                placeholder="Enter calories"
                type="number"
                value={foodCalories}
                onChange={(e) => setFoodCalories(e.target.value)}
                className="info-input"
                required
              />

              <button type="submit" className="info-button">
                Submit
              </button>
            </div>

            {consumedCal.map((food) => (
              <div key={food.consumedId} className="foodlist">
                <p className="foodName-font">
                  <strong>Food Name : </strong>
                </p>
                <p className="food-description">{food.name}</p>
                <p className="calories-font">
                  <strong>Calories :</strong>
                </p>
                <p className="calories-description">{food.total} kcal</p>
                <button
                  className="delete-food-button"
                  type="button"
                  onClick={() => onDeleteFood(food.consumedId)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </form>

        <div className="sub-header-info">
          <h2>TRACK YOUR EXERCISE</h2>
        </div>

        <form onSubmit={onSubmitExercise} className="info-submit">
          <div className="info-submit-scroll">
            <div className="inputFields">
              <input
                placeholder="Enter your Workout"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className="info-input"
                required
              />

              <input
                placeholder="Enter calories"
                type="number"
                value={exerciseCalories}
                onChange={(e) => setExerciseCalories(e.target.value)}
                className="info-input"
                required
              />

              <button type="submit" className="info-button">
                Submit
              </button>
            </div>

            {exercise.map((ex) => (
              <div key={ex.exerciseId} className="foodlist">
                <p className="foodName-font">
                  <strong>Exercise Name : </strong>
                </p>
                <p className="food-description">{ex.exerciseName}</p>
                <p className="calories-font">
                  <strong>Calories :</strong>
                </p>
                <p className="calories-description">{ex.totalExercise} kcal</p>
                <button
                  className="delete-food-button"
                  type="button"
                  onClick={() => onDeleteExercise(ex.exerciseId)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>

      <Chart user={user} />
    </div>
  );
}
