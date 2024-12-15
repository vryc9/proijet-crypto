import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import PasswordService from "../../services/passwordService";
import "./password.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

  const editPassword = (password) => (e) => {
    e.preventDefault();
    navigate('/edit/'+password.id);
}
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

  useEffect(() => {
      if(!sessionStorage.getItem('loggedIn')){
        navigate("/");
      }
  }, []);
  return (
    <div className="password">
      <NavBar></NavBar>
      <div className="content">
        <h1>Your passwords</h1>
        <button onClick={downloadPasswordFromVault}>
          Export vault
        </button>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
                <th>Edit</th>
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
                        Show password
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={removePassword(password)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={editPassword(password)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="" onClick={navigateCreate}>
          Add Password
        </a>
      </div>
    </div>
  );
}

export default Password;
