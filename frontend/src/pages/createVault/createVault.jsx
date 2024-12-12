import NavBar from "../../components/navbar/NavBar";
import "./createVault.scss";
import { useState } from "react";
import PasswordService from "../../services/passwordService";
import { Password, Vault } from "../../services/vault";

function CreateVault() {

  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    PasswordService.createVault(formData.password);
  };

  return (
    <div className="createVault">
      <NavBar></NavBar>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h1>
            <center>Your New Vault</center>
          </h1>
          <div className="inputs">
            <div className="input">
              <label htmlFor="username">Vault password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button id="log-in-btn">Créer</button>
        </form>
      </div>
    </div>
  );
}

export default CreateVault;
