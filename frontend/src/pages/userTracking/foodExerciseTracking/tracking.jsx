import "./tracking.css";
import Chart from "../calorie-chart/Chart";
export default function UserTracking() {
  return (
    <>
      <div className="info">
        <div className="submission-info">
          <div className="sub-header-info">
            <h2>TIME TO TRACK!</h2>
          </div>
          <form onSubmit={onSubmitHandler} className="info-submit">
            <div className="info-submit-scroll">
              <div className="inputFields">
                <input
                  placeholder="Enter your Food"
                  name="foodName"
                  value={userInfo.foodName}
                  onChange={handleFood}
                  className="info-input"
                  required
                  maxLength={100}
                />

                <input
                  placeholder="Enter calories"
                  type="number"
                  name="calories"
                  value={userInfo.calories}
                  onChange={handleFood}
                  className="info-input"
                  required
                />

                <button type="submit" className="info-button">
                  Submit
                </button>
              </div>

              {consumedCal.map((food, index) => (
                <div key={food.consumedId} className="foodlist">
                  <p className="foodName-font">
                    <strong>Food Name : </strong>
                  </p>
                  <p className="food-description"> {food.name}</p>
                  <p className="calories-font">
                    <strong>Calories :</strong>
                  </p>
                  <p className="calories-description">{food.total} kcl</p>
                  <button
                    className="delete-food-button"
                    type="button"
                    onClick={() => handleDeleteFood(food.consumedId)}
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
          <form onSubmit={onWorkoutSubmit} className="info-submit">
            <div className="info-submit-scroll">
              <div className="inputFields">
                <input
                  placeholder="Enter your Workout"
                  name="exerciseName"
                  value={userInfo.exerciseName}
                  onChange={handleExercise}
                  className="info-input"
                  required
                />
                <input
                  placeholder="Enter calories"
                  type="number"
                  name="exerciseCalories"
                  value={userInfo.exerciseCalories}
                  onChange={handleExercise}
                  className="info-input"
                  required
                />
                <button type="submit" className="info-button">
                  Submit
                </button>
              </div>
              {exercise.map((exercise, index) => (
                <div key={exercise.exerciseId} className="foodlist">
                  <p className="foodName-font">
                    <strong>Exercise Name : </strong>
                  </p>
                  <p className="food-description"> {exercise.exerciseName}</p>
                  <p className="calories-font">
                    <strong>Calories :</strong>
                  </p>
                  <p className="calories-description">
                    {exercise.totalExercise} kcl
                  </p>
                  <button
                    className="delete-food-button"
                    type="button"
                    onClick={() => deleteExercise(exercise.exerciseId)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </form>
        </div>
        <Chart />
      </div>
    </>
  );
}
