export default class User {
    private name: string;
    private surname: string;
    private username: string;
    private languages: string[];
    private birthdate: Date;
    private email: string;
    private password: string;
    constructor(name: string, surname: string, username: string, languages: string, birthdate: string, email: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.languages = languages.split(",");
        this.birthdate = new Date(birthdate);
        this.email = email;
        this.password = password;
    }
}