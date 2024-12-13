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
        <h2>Connexion à votre compte</h2>
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          aria-label="Mot de passe"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
        {error && <p>Le mot de passe est incorrect</p>}
      </form>
    </div>
  );
};

export default Auth;
