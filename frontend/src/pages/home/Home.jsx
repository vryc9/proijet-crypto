// import logo from '../../assets/logo.svg'
// import { useEffect } from 'react';
import { useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import './home.scss';
import PasswordService from '../../services/passwordService';
import { useNavigate } from 'react-router-dom';

function Home() {

  const publicKeyCasting =
  "-----BEGIN PUBLIC KEY-----\
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGOFm4RnyM1fjwkN8uDImOppetjO\
ah7z4xhM87kJrZiTi/DoJEFzQ3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHn\
kEdtDI++SvqPGX3iqUe85LnCXvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIX\
gC10t+i+5s/wHOPBAgMBAAE=\
-----END PUBLIC KEY-----"

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
-----END RSA PRIVATE KEY-----"

  const encrypt = (message, publicKey) => {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);

    jsEncrypt.setPrivateKey(privateKeyCasting);
    let encrypted = jsEncrypt.encrypt(message);
    console.log("encr", encrypted)
    let decrypted = jsEncrypt.decrypt(encrypted);
    console.log("DECR", decrypted);
    
    // console.log(message, publicKey)
    return jsEncrypt.encrypt(message);
  }

  let result = encrypt("hello", publicKeyCasting)
  // console.log(result);
  const navigate = useNavigate();

  const vaultEmpty = PasswordService.checkVault();

  const navigateToHome = () => {
    navigate('/createvault')
  }

  const navigateToPasswords = () => {
    navigate('/passwords')
  }

  const resetPassword = () => {
    PasswordService.resetVault();
  }
  return (
    <div id="home">
      <NavBar></NavBar>
      <div className="body">
        <div className="content">
          {
            vaultEmpty && 
            <form action="/passwords" className="loginForm" method="POST">
              <h1><center>You don't have a vault yet</center></h1>
              <div className="buttons">
                <button className="btn" id='log-in-btn' onClick={navigateToHome}>New vault</button>
                <button className="btn" id="import-btn">Import</button>
              </div>
            </form>
          }
          {
            !vaultEmpty && 
            <form action="#" className="loginForm" method="POST">
              <h1><center>Access your vault</center></h1>
              <div className="buttons">
                <button className="btn" id='log-in-btn' onClick={navigateToPasswords}>Here</button>
                <button className="btn" id='log-in-btn' onClick={resetPassword}>Reset Vault</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
