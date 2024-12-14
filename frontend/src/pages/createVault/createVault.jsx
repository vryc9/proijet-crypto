import NavBar from "../../components/navbar/NavBar";
import "./createVault.scss";
import { useState } from "react";
import PasswordService from "../../services/passwordService";
import { useNavigate } from "react-router-dom";

function CreateVault() {
  const navigate = useNavigate();

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
    e.preventDefault();
    PasswordService.createVault(formData.password);
    navigate("/", { state: { vaultCreated: true } });
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
