import { useEffect, useState } from "react";
import "./exceededCalories.css";

export default function ExceededCalories({ remainingCalories }) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (remainingCalories <= 0) {
      setIsDismissed(false);
    }
  }, [remainingCalories]);

  const handleClose = () => {
    setIsDismissed(true);
  };

  if (remainingCalories > 0 || isDismissed) return null;

  return (
    <div className="exceeded-calories">
      <h2 className="exceeded-title">
        You've exceeded your calorie limit for the day!
      </h2>
      <p className="exceeded-text">
        Please try to stay within your target calories to maintain a healthy lifestyle.
      </p>
      <button className="exceeded-button" onClick={handleClose}>
        Be careful!
      </button>
    </div>
  );
}
