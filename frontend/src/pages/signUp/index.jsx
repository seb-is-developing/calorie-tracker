import { useState } from "react";
import MainNavBar from "../../components/mainNavBar";
import Footer from "../../components/footer";
import { createUser } from "../../api/api";
import "./signUp.css";
import pathConfig from "../../route/config.json";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const nextErrors = {};

    if (!form.firstName.trim())
      nextErrors.firstName = "First name is required.";
    if (!form.email.trim()) nextErrors.email = "Email cannot be empty.";
    if (!form.username.trim())
      nextErrors.username = "Username cannot be empty.";
    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const payload = {
        userName: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      };
      const data = await createUser(payload);
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      navigate(pathConfig.dashboard);
    } catch (err) {
      setSubmitError(err.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MainNavBar />
      <div className="sign-up">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="form-title">READY TO START!</h1>
          <div className="fields">
            <label className="label">First Name:</label>
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="i.e John"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            <label className="label">Last Name:</label>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="i.e Doe"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}

            <label className="label">Email:</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              placeholder="JohnDoe@gmail.com"
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <label className="label">Username:</label>
            <input
              className="input"
              type="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}

            <label className="label">Password:</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            {submitError && <span className="error">{submitError}</span>}

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              READY
            </button>
            <div className="log-in-link">
              <label className="log-in-label">
                Already have an account? Click here to log in
              </label>
              <button
                className="log-in-button"
                type="button"
                onClick={() => navigate(pathConfig.login)}
              >
                LOG IN
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
