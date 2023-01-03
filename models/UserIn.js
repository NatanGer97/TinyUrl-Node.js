class UserIn {
    #name;
    #email;
    #password;
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
    }
    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }
    get email() {
        return this.#email;
    }
    set email(email) {
        this.#email = email;
    }
    get password() {
        return this.#password;
    }
    set password(password) {
        this.#password = password;
    }
    
}