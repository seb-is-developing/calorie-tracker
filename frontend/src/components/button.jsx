import { useNavigate } from "react-router-dom";
import "./button.css"


export default function Button({ buttonName, path }) {
  const navigate = useNavigate();

  return <button className="button" onClick={() => navigate(path)}>{buttonName}</button>;
}
