import useAuth from "../../hooks/useAuth";
import "./Style.scss";
import { useState } from "react";

const Auth = () => {
  const { authenticateUser, error, setError, isLoading } = useAuth();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticateUser(password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Access your Vault</h2>
        <input
          type="password"
          name="password"
          placeholder="Type your password here..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          aria-label="Mot de passe"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log in"}
        </button>
        {error && <p>incorrect password</p>}
      </form>
    </div>
  );
};

export default Auth;
