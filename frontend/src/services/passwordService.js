import { Vault, Password } from "./vault";
import bcrypt from "bcryptjs";

import forge from "node-forge";

class PasswordService {
  endpoint = "/password";

  static publicKeyCasting =
    "-----BEGIN PUBLIC KEY-----\
    MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGOFm4RnyM1fjwkN8uDImOppetjO\
    ah7z4xhM87kJrZiTi/DoJEFzQ3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHn\
    kEdtDI++SvqPGX3iqUe85LnCXvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIX\
    gC10t+i+5s/wHOPBAgMBAAE=\
    -----END PUBLIC KEY-----";

  static checkVault() {
    return localStorage.getItem("vault") == null;
  }

  static getVault() {
    if (this.checkVault()) {
      return false;
    }
    return JSON.parse(localStorage.getItem("vault"));
  }

  static addPasswordToVault(password) {
    let passwords;
    if (this.checkVault()) {
      return false;
    }
    passwords = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
    passwords.addPassword(password);
    let jsonPasswords = JSON.stringify(passwords);
    localStorage.setItem("vault", jsonPasswords);
    return true;
  }

  static getPasswords() {
    if (this.checkVault()) {
      return [];
    }
    let passwords = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
    return passwords.passwords;
  }

  static resetVault() {
    localStorage.clear();
  }

  static getPasswordById(id) {
    if (this.checkVault()) {
      return false;
    }
    return this.getPasswords().find((p) => p.id == id);
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

  static setVault(vault) {
    localStorage.setItem("vault", JSON.stringify(vault));
  }

  static encryptPassword(password) {
    console.log(this.publicKeyCasting);
    const publicKey = forge.pki.publicKeyFromPem(this.publicKeyCasting);
    const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  }

  static removePassword(password) {
    console.log("removing");
    if (this.checkVault()) {
      return false;
    }
    let vault = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
    vault.removePassword(password);
    localStorage.setItem("vault", JSON.stringify(vault));
  }

  static downloadVault() {
    if (this.checkVault()) {
      return false;
    }
    const vault = JSON.parse(localStorage.getItem("vault"));
    const jsonString = JSON.stringify(vault, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "motDePasse.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  static editPassword(password){
    if (this.checkVault()) {
        return false;
    }  
    let vault = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
    vault.editPassword(password);
    localStorage.setItem("vault", JSON.stringify(vault));
  }

  static getPasswordById(id){
    let vault = Vault.fromJSON(JSON.parse(localStorage.getItem("vault")));
    return vault.getPasswordById(id);
  }
}

export default PasswordService;
