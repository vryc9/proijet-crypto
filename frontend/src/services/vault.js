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

    constructor(website, password, username){
        this.website = website;
        this.password = password;
        this.username = username;
        this.id = generateRandomString();
    }
    
    static fromJSON(data) {
        return new Password(data.website, data.password, data.username);
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

