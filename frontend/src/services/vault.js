export class Vault{
    passwords;
    password;
    
    constructor(password){
        this.passwords = [];
        this.password = password;
    }

    addPassword(password){
        this.passwords.push(password);
    }

    removePassword(password){
        let pos = 0;
        for(let pass of this.passwords){
            console.log(pass)
            console.log(password);
            if(pass.id == password.id) {
                this.passwords.pop(pos);
                return true;
            }
            pos++;
        }
        return false;
    }

    editPassword(password){
        let pos = 0;
        for(let pass of this.passwords){
            if(pass.id == password.id) {
                this.passwords[pos] = password;
                return true;
            }
            pos++;
        }
        return false;
    }

    getPasswordById(id){
        let pos = 0;
        for(let pass of this.passwords){
            if(pass.id == id) {
                return pass;
            }
            pos++;
        }
        return null;
    }
    static fromJSON(data) {
        const vault = new Vault(data.password);
        vault.passwords = data.passwords.map((p) => Password.fromJSON(p));
        return vault;
    }
}

export class Password{
    website;
    password;
    username;
    id;

    constructor(website, password, username, id=generateRandomString()){
        this.website = website;
        this.password = password;
        this.username = username;
        this.id = id;
    }

    static fromJSON(data) {
        return new Password(data.website, data.password, data.username, data.id);
    }
}

function generateRandomString(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 32; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
}

