import "./stories.css";
import { useState } from "react";
export default function Stories() {
  const stories = [
    {
      result:
        "Lost 30 lbs through a combination of calorie control, strength training, and cardio. Increased bench press by 50 lbs and built noticeable muscle tone in arms and chest.",
      name: "Liam S",
    },
    {
      result:
        " Gained 10 lbs of lean muscle by focusing on progressive resistance training and proper nutrition. Ran a 10k in under an hour and increased overall endurance significantly.",
      name: "Sophie A",
    },
    {
      result:
        " By six months, Jake wasn't just stronger physically; he felt like a different person. What began as a tentative step into the gym had turned into a routine that made him feel unstoppable. The hardest part was getting started, but once he did, he never looked back.",
      name: "Cody A",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [storyName, setStoryName] = useState(stories[selectedIndex].name);
  const [storyResult, setStoryResult] = useState(stories[selectedIndex].result);
  const [isActive, setIsActive] = useState(false);
  const handleClick = (i) => {
    setStoryResult(stories[i].result);
    setStoryName(stories[i].name);
    
  };


  return (
    <>
      <div className="story-section">
        <h1 className="story-title">This should inspire you</h1>
        <div className="story-description">
          <h2 className="story-name">{storyName}</h2>
          <p className="story-result">{storyResult}</p>
          <div className="container-buttons">
            {stories.map((element, index) => {
              console.log(index);
              return (
                <button
                  className={`story-buttons${isActive ? "-active" : ""}`}
                  onClick={() => handleClick(index)}
                  key={index}
                >
                  {element.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
