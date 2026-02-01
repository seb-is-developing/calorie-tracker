import "./mainNavBar.css";
import Button from "./button.jsx";
import pathConfig from "../route/config.json";
export default function MainNavBar() {
  const navItems = [
    { name: "Home", path: pathConfig.home },
    { name: "Log-in", path: pathConfig.logIn },
    { name: "Contact Us", path: pathConfig.contactUs },
    { name: "Blog", path: pathConfig.blog },
  ];

  return (
    <>
      <header className="navbar">
        <div className="logo">MySite</div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <Button key={item.name} buttonName={item.name} path={item.path} />
          ))}
        </ul>
      </header>
    </>
  );
}
