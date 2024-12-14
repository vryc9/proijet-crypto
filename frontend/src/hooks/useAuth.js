import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authenticateUser = async (passwordInput) => {
    setIsLoading(true);
    try {
      const { password } = JSON.parse(localStorage.getItem("vault"));
      const data = {
        clear_password: passwordInput,
        hash_password: password,
      };

      const response = await fetch("http://127.0.0.1:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const { is_valid } = await response.json();

      if (is_valid) {
        sessionStorage.setItem('loggedIn', true);
        navigate("/passwords");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateUser, error, setError, isLoading };
};

export default useAuth;
