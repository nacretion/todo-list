import { Pool } from "pg";

export class Database {
    private static pool: Pool;

    public static connect(): void {
        if (!Database.pool) {
            Database.pool = new Pool({
                host: 'localhost',
                user: 'postgres',
                password: 'root',
                database: 'etagi',
                port: 5432
            });
        }
    }

    public static query(text: string, params?: any[]): Promise<any> {
        Database.connect()
        return Database.pool.query(text, params);
    }
}