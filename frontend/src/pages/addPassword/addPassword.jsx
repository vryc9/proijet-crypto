import NavBar from "../../components/navbar/NavBar";
import "./addPassword.scss";
import { useState } from "react";
import forge from "node-forge";

function AddPassword() {
  const publicKeyCasting =
    "-----BEGIN PUBLIC KEY-----\
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGOFm4RnyM1fjwkN8uDImOppetjO\
ah7z4xhM87kJrZiTi/DoJEFzQ3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHn\
kEdtDI++SvqPGX3iqUe85LnCXvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIX\
gC10t+i+5s/wHOPBAgMBAAE=\
-----END PUBLIC KEY-----";

  const encryptPassword = (password) => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyCasting);
    const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

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
      password: encryptPassword(formData.password),
    };

    const response = await fetch("http://127.0.0.1:5000/vaults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

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
