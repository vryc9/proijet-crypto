import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import PasswordService from "../../services/passwordService";
import "./password.scss";
import { useNavigate } from "react-router-dom";

function Password() {
  const navigate = useNavigate();
  const [decryptedPasswords, setDecryptedPasswords] = useState({});
  const navigateCreate = () => {
    navigate("/addpassword");
  };

  let passwords = PasswordService.getPasswords();

  const removePassword = (password) => (e) => {
    e.preventDefault();
    PasswordService.removePassword(password);
    window.location.reload();
  };

  const downloadPasswordFromVault = (e) => {
    e.preventDefault();
    PasswordService.downloadVault();
  };

  const showPassword = async (id, e) => {
    e.preventDefault();
    const passwordToDecrypt = PasswordService.getPasswordById(id);
    const response = await fetch("http://127.0.0.1:5000/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordToDecrypt),
    });
    const { password } = await response.json();

    setDecryptedPasswords((prev) => ({
      ...prev,
      [id]: password,
    }));

    copyToClipboard(password);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Mot de passe copié !");
      })
      .catch((err) => {
        console.error("Erreur de copie : ", err);
      });
  };

  return (
    <div className="password">
      <NavBar></NavBar>
      <div className="content">
        <h1>Liste des mots de passe</h1>
        <button onClick={downloadPasswordFromVault}>
          Exporter les mots de passes
        </button>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th>Nom d'utilisateur</th>
                <th>Mot de passe</th>
                <th>Supprimer</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((password, index) => (
                <tr key={index}>
                  <td>{password.website}</td>
                  <td>{password.username}</td>
                  <td>
                    {decryptedPasswords[password.id] ? (
                      decryptedPasswords[password.id]
                    ) : (
                      <button onClick={(e) => showPassword(password.id, e)}>
                        Voir le mot de passe
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={removePassword(password)}>
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button onClick={removePassword(password)}>Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="" onClick={navigateCreate}>
          Ajouter mot de passe
        </a>
      </div>
    </div>
  );
}

export default Password;
