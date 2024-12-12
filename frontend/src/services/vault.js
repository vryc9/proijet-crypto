export class Vault{
    passwords;
    password;
    constructor(password){
        this.passwords = [];
        this.password = password;
    }
}

export class Password{
    website;
    password;
    username;

    constructor(website, password, username){
        this.website = website;
        this.password = password;
        this.username = username;
    }
}

