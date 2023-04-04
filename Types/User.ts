import {Database} from "../database"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {jwtSecretKey, saltRounds} from "../env";


export default class User {
    id!: number;
    login: string;
    private password: string;
    firstName: string;
    lastName: string;
    secondName: string;

    constructor(id: number, login: string, password: string, firstName: string, lastName: string, secondName: string) {
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.secondName = secondName;
        if (id) {
            this.id = id
        }
    }

    static async getAbbreviatedNameById(id: number): Promise<string | undefined> {
        const user = await User.findById(id)

        if (user) {
            return user.lastName + " " + user.firstName[0].toUpperCase() + "." + user.secondName[0].toUpperCase() + ".";
        }
        return undefined
    }



    // @ts-ignore
    static async findById(id: number): Promise<User | undefined> {
        const result = await Database.query("select * from users where id = $1", [id]);
        if (result.rowCount === 0) {
            return undefined;
        } else {
            const row = result.rows[0];
            return new User(row.id, row.login, row.password, row.first_name, row.last_name, row.second_name);
        }
    }

    // @ts-ignore
    static async findByUsername(username: string): Promise<User | undefined> {
        const result = await Database.query("select * from users where login = $1", [username]);
        if (result.rowCount === 0) {
            return undefined;
        } else {
            const row = result.rows[0];
            return new User(row.id, row.login, row.password, row.first_name, row.last_name, row.second_name);
        }
    }


    // @ts-ignore
    static async create(login: string, password: string, firstName: string, lastName: string, secondName: string): Promise<User | undefined> {
        const candidate = await this.findByUsername(login)


        if (candidate) {
            return undefined
        } else {

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await Database.query(
                "INSERT INTO users (login, password, first_name, last_name, second_name) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                [login, hashedPassword, firstName, lastName, secondName]
            );
            const id = result.rows[0].id;
            return new User(id, login, password, firstName, lastName, secondName);
        }
    }

    static async authenticateUser(username: string, password: string): Promise<{user: User, token: string} | number> {
        const user = await this.findByUsername(username);

        if (!user) {
            return 404;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return 401;
        }

        const token = await this.createToken(user)
        if (token) {
            user.password = password
            return {user, token}
        }
        return 500
    }
    static async createToken(user: User): Promise<string | undefined> {
        return jwt.sign({user_id: user.id}, jwtSecretKey)
    }

    static async verifyToken(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, jwtSecretKey) as {user_id: number}
            const result = await Database.query(
                "SELECT * FROM users WHERE id = $1",
                [decoded.user_id]
            );

            return result.rowCount === 1;
        } catch (error) {
            return false;
        }
    }
}
