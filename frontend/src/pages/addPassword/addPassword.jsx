import NavBar from "../../components/navbar/NavBar";
import "./addPassword.scss";
import { useState } from "react";
import PasswordService from "../../services/passwordService";
import { Password } from "../../services/vault";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AddPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    website: "",
    username: "",
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
    let data = {
      username: formData.username,
      website: formData.website,
      password: PasswordService.encryptPassword(formData.password),
    };
    let pass = new Password(data.website, data.password, data.username);
    PasswordService.addPasswordToVault(pass);
    navigate("/passwords");
  };

  useEffect(() => {
    if (!sessionStorage.getItem("loggedIn")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="addPassword">
      <NavBar></NavBar>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h1>
            <center>New password</center>
          </h1>
          <div className="inputs">
            <div className="input">
              <label htmlFor="username">Website url</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="password">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button id="log-in-btn">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default AddPassword;
