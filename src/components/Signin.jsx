import { useState } from "react";

const Signin = ({ setShowSignin, setName }) => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");

  function formatName(email) {
    const username = email.split("@")[0];

    return username
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = formatName(email);

    setName(name);

    setShowSignin(false);
  }

  return (
    <div className="modal-backdrop" onClick={() => setShowSignin(false)}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <button
            className={`auth-tab ${register ? "" : "active"}`}
            onClick={() => setRegister(false)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${register ? "active" : ""}`}
            onClick={() => setRegister(true)}
          >
            Register
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" required type="password" />
          </div>
          {register && (
            <div className="form-field">
              <label htmlFor="auth-confirm">Confirm Password</label>
              <input id="auth-confirm" required type="password" />
            </div>
          )}
          {register && (
            <div className="form-field">
              <label htmlFor="auth-phone">Phone Number</label>
              <input id="auth-phone" required type="tel" />
            </div>
          )}
          <div className="modal-actions auth-actions">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setShowSignin(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
