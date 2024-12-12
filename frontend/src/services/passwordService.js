import { Vault, Password } from "./vault";
import bcrypt from 'bcryptjs';

import forge from "node-forge";

class PasswordService {
  static endpoint = "/password";

  static publicKeyCasting = `
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGOFm4RnyM1fjwkN8uDImOppetjO
ah7z4xhM87kJrZiTi/DoJEFzQ3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHn
kEdtDI++SvqPGX3iqUe85LnCXvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIX
gC10t+i+5s/wHOPBAgMBAAE=
-----END PUBLIC KEY-----
`;
  


  static savePasswordToVault(callback) {
    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(callback);
    xhr.addEventListener("load", callback);
    xhr.open("POST", "http://127.0.0.1:5000/vaults");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
  }

    static checkVault() {
        return localStorage.getItem("vault") == null;
    }

    static getPasswords() {
        vault = JSON.parse(localStorage.getItem("vault"));
        console.log(vault);
        return vault.passwords;
    }

    static addPasswordToVault(password) {
        console.log("adding...");
        console.log(this.checkVault());
        let passwords;
        if (this.checkVault()) {
        return false;
        }  
        passwords = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
        console.log(passwords);
        passwords.addPassword(password); 
        console.log(passwords);
        let jsonPasswords = JSON.stringify(passwords);
        localStorage.setItem("vault", jsonPasswords);
        return true;
    }

    static resetVault(){
        localStorage.clear();
    }

    static async createVault(password) {

        if (!this.checkVault()) {
            console.log("you already have a vault !");
        return false;
        }
        let encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        let vault = new Vault(encryptedPassword);
        localStorage.setItem("vault", JSON.stringify(vault));
        console.log("set to localstorage");
    }

    static encryptPassword(password) {
        console.log(this.publicKeyCasting);
        const publicKey = forge.pki.publicKeyFromPem(this.publicKeyCasting);
        const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        });
        return forge.util.encode64(encrypted);
    }

    
}

export default PasswordService;
