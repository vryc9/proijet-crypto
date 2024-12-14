// import logo from '../../assets/logo.svg'
// import { useEffect } from 'react';
import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./home.scss";
import PasswordService from "../../services/passwordService";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../auth/Auth";
function Home() {
  const publicKeyCasting =
    "-----BEGIN PUBLIC KEY-----\
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGOFm4RnyM1fjwkN8uDImOppetjO\
ah7z4xhM87kJrZiTi/DoJEFzQ3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHn\
kEdtDI++SvqPGX3iqUe85LnCXvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIX\
gC10t+i+5s/wHOPBAgMBAAE=\
-----END PUBLIC KEY-----";

  const privateKeyCasting =
    "-----BEGIN RSA PRIVATE KEY-----\
MIICWwIBAAKBgGOFm4RnyM1fjwkN8uDImOppetjOah7z4xhM87kJrZiTi/DoJEFz\
Q3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHnkEdtDI++SvqPGX3iqUe85LnC\
XvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIXgC10t+i+5s/wHOPBAgMBAAEC\
gYA0gE5Laii/VxLw9t/S/1/UAbMh3rqS+5wovKeyTM28eNHRU9WUhYbqm+z5hG6N\
bBTP3r9YKYqDhNV9PI23bjtbgImlAUpTrREKbMJl6P4Jhhlv6sPu1y79rhzN5Uaa\
E1jlotkTzfNIeLWeV+K9t13+10fEY1LC3WeFJQEwjXXewQJBALTGkK7rHpLy6qav\
pitS9qghZTR2ULKre9M3JM6DEx/mnLq+7CWX42Dlim+BkdVrzZqT2aj5yxkVrHPt\
2HTWLikCQQCM71k8YczLdp0apsABcUhLtbZEQCn+zCjFRdtuWY8mjpvk3wf0dQEn\
9tOdadyxPsvCpXF78OX3aq6WM3WIdAvZAkBJeY9i2QODPKJs/2VtpHnGWlR1H0Wr\
aRGaBoa6PQIv7B51tJXsrbBoOMOskKBCe1+E3WURTf3jgzClqd1Zl5gJAkBKh+En\
H4lQKCAZEgoEOUZEU4paOZx71LfS64iJqO8dMtmahaANVTsRSWTLoEpHqa/T9e43\
30OePlqpr/j9+nCxAkEAlLsvN0Mk5pbcMPRe1WOpG84TS3QMgH38mFskFlk7zQBc\
M8LnKm9Rq1KUkvqMFAWN88wSs8l0bgm1aydcONM3FA==\
-----END RSA PRIVATE KEY-----";

  const navigate = useNavigate();
  const location = useLocation();
  const [isExistVault, setIsExistVault] = useState(null);

  useEffect(() => {
    if (location.state?.vaultCreated) {
      setIsExistVault(true);
    } else {
      setIsExistVault(!PasswordService.checkVault());
    }
  }, [location.state]);

  const resetPassword = () => {
    PasswordService.resetVault();
    setIsExistVault(false);
  };

  const navigateToHome = () => {
    navigate("/createvault");
  };

  const handleImportFileChange = async (e) => {
    const [file] = e.target.files;
    if (!file) return;

    try {
      const content = await getContentFile(file);
      PasswordService.setVault(JSON.parse(content));

      setIsExistVault(true);
    } catch (error) {
      console.error("Error importing vault:", error);
    }
  };

  const getContentFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  };

  return (
    <div id="home">
      <NavBar />
      <div className="body">
        <div className="content">
          {!isExistVault && (
            <form action="/passwords" className="loginForm" method="POST">
              <h1>
                <center>You don't have a vault yet</center>
              </h1>
              <div className="buttons">
                <button
                  className="btn"
                  id="log-in-btn"
                  onClick={navigateToHome}
                >
                  New vault
                </button>
                <div className="input-file">
                  <input
                    type="file"
                    name="file"
                    onChange={handleImportFileChange}
                    id="import"
                  />
                  <label htmlFor="import" className="btn">
                    Import File
                  </label>
                </div>
              </div>
            </form>
          )}
          {isExistVault && (
            <div className="loginForm">
              <Auth />
              <div className="buttons">
                <button className="btn" id="log-in-btn" onClick={resetPassword}>
                  Reset Vault
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
