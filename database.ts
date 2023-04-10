import { Pool } from "pg";

export class Database {
    private static pool: Pool;

    public static async connect(): Promise<void> {
        if (!Database.pool) {
            Database.pool = new Pool({
                host: 'localhost',
                user: 'postgres',
                password: 'root',
                database: 'etagi',
                port: 5432
            });
            await this.initialiseTables()
        }
    }

    public static query(text: string, params?: any[]): Promise<any> {
        Database.connect()
        return Database.pool.query(text, params);
    }
    public static async initialiseTables(){
        await Database.query("create table if not exists task( id serial primary key, heading text not null, description text, end_date timestamp not null, create_date timestamp default now(), upd_date timestamp default now(), priority integer default 0, status integer default 0, creator_id integer not null, responsible_id integer not null);")
        await Database.query("create table if not exists users( id serial primary key, login text not null unique, password text not null, first_name text not null, last_name text not null, second_name text not null);")
        await Database.query("create table if not exists responsible_rel(id serial primary key, chief_id integer not null, subordinate_id integer not null);")


    }
}