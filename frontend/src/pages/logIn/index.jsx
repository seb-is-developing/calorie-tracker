import "./logIn.css";
import Footer from "../../components/footer";
import MainNavBar from "../../components/mainNavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import pathConfig from "../../route/config.json";
import { logInUser } from "../../api/api";

export default function LogIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const nextErrors = {};

    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const data = await logInUser({
        email: form.email,
        password: form.password,
      });
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      navigate(pathConfig.dashboard);
    } catch (err) {
      setSubmitError(err.message || "Failed to log in");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <MainNavBar />
      <div className="log-in">
        <form onSubmit={onSubmitHandler} className="log-in-form">
          <h1 className="log-in-title">WELCOME COME BACK LEGEND</h1>

          <div className="log-in-fields">
            <label className="log-in-label">Email:</label>
            <input
              className="log-in-input"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <label className="log-in-label">Password:</label>
            <input
              className="log-in-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            {submitError && <span className="error">{submitError}</span>}

            <button
              className="log-in-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "LOGGING IN..." : "TIME TO FOCUS"}
            </button>
            <div className="sign-up-link">
              <label className="label-to-sign-up">
                Haven't started click here to signup
              </label>
              <button
                type="button"
                className="button-to-signup"
                onClick={() => navigate(pathConfig.signUp)}
              >
                SIGNUP
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
