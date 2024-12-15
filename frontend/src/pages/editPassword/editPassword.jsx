import NavBar from "../../components/navbar/NavBar";
import "./editPassword.scss";
import { useEffect, useState } from "react";
import PasswordService from "../../services/passwordService";
import { Password } from "../../services/vault";
import { useNavigate, useParams } from 'react-router-dom';

function EditPassword() {
    
    const decryptPassword = async (id) => {
        const passwordToDecrypt = PasswordService.getPasswordById(id);
        const response = await fetch("http://127.0.0.1:5000/decrypt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordToDecrypt),
        });

        let pass = await response.json();
        setFormData({
            website: pass.website,
            username: pass.username,
            password: pass.password,
        })
        return pass;
    
      };
  const { id } = useParams();
  const navigate = useNavigate(); 
  const password = PasswordService.getPasswordById(id);
  
  
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
    let pass = new Password(data.website, data.password, data.username, password.id);
    PasswordService.editPassword(pass);
    navigate("/passwords");
  };

  useEffect(() => {
    if(!sessionStorage.getItem('loggedIn')){
      navigate("/");
    }
    decryptPassword(id);
  }, []);
  return (
    <div className="editPassword">
      <NavBar></NavBar>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h1>
            <center>Edit password</center>
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
                type="text"
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

export default EditPassword;
