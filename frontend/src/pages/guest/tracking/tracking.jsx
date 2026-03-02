import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { consumedCaloriesActions } from "../../../store/store";
import { exerciseActions } from "../../../store/store";
import GuestChart from "../chart/chart.jsx";
import GuestBarChart from "../barchart";
import { v4 as uuidv4 } from "uuid";
import "../../userTracking/foodExerciseTracking/tracking.css";
import UserGuestNavBar from "../../../components/userGuestNavBar.jsx";
import Footer from "../../../components/footer.jsx";
export default function GuestTracking() {
  const dispatch = useDispatch();
  const consumedCal = useSelector(
    (state) => state.consumedCalories.consumedCalories,
  );
  const exercise = useSelector((state) => state.exercise.amountOfExercise);
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");

  const onSubmitFood = (e) => {
    e.preventDefault();

    dispatch(
      consumedCaloriesActions.addConsumedCalories({
        id: uuidv4(),
        name: foodName,
        calories: Number(foodCalories),
      }),
    );

    setFoodName("");
    setFoodCalories("");
  };

  const onSubmitExercise = (e) => {
    e.preventDefault();

    dispatch(
      exerciseActions.addExercise({
        id: uuidv4(),
        exerciseName,
        calories: Number(exerciseCalories),
      }),
    );

    setExerciseName("");
    setExerciseCalories("");
  };

  return (
    <>
      <UserGuestNavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
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

                {consumedCal.map((food, index) => (
                  <div key={index} className="foodlist">
                    <p className="foodName-font">
                      <strong>Food Name : </strong>
                    </p>
                    <p className="food-description">{food.name}</p>
                    <p className="calories-font">
                      <strong>Calories :</strong>
                    </p>
                    <p className="calories-description">{food.calories} kcal</p>
                    <button
                      className="delete-food-button"
                      type="button"
                      onClick={() =>
                        dispatch(
                          consumedCaloriesActions.deleteConsumedCalories(
                            food.id,
                          ),
                        )
                      }
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

                {exercise.map((ex, index) => (
                  <div key={index} className="foodlist">
                    <p className="foodName-font">
                      <strong>Exercise Name : </strong>
                    </p>
                    <p className="food-description">{ex.exerciseName}</p>
                    <p className="calories-font">
                      <strong>Calories :</strong>
                    </p>
                    <p className="calories-description">{ex.calories} kcal</p>
                    <button
                      className="delete-food-button"
                      type="button"
                      onClick={() =>
                        dispatch(exerciseActions.deleteExercise(ex.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div>
            <GuestChart />
            <GuestBarChart />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
