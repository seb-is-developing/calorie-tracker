import "./mainNavBar.css";
import Button from "./button.jsx";
import pathConfig from "../route/config.json";
export default function MainNavBar() {
  const navItems = [
    { name: "Home", path: pathConfig.home },
    { name: "Log-in", path: pathConfig.login },
  ];

  return (
    <>
      <header className="navbar">
        <div className="logo">Nutrition Tracker</div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <Button key={item.name} buttonName={item.name} path={item.path} />
          ))}
        </ul>
      </header>
    </>
  );
}
