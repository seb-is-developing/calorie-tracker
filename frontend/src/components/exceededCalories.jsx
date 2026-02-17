import { useState } from "react";
import "./exceededCalories.css";

export default function ExceededCalories() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="exceeded-calories">
      <h2 className="exceeded-title">
        You've exceeded your calorie limit for the day!
      </h2>
      <p className="exceeded-text">
        Please try to stay within your target calories to maintain a healthy
        lifestyle.
      </p>
      <button className="exceeded-button" onClick={onClickHandler}>
        Be careful !
      </button>
    </div>
  );
}
