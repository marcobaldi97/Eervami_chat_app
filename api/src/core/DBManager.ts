import { Pool, Client } from 'pg';

export class DBManager {
    static instance: DBManager;
    client: Client;
    pool: Pool;

    public static getInstance(): DBManager {
        !DBManager.instance && (DBManager.instance = new DBManager());

        return DBManager.instance;
    }

    private constructor() {
        const dbUser = 'postgres';
        const dbPassword = 'basedMaster97';
        const dbIp = 'localhost';
        const dbPort = 5432;
        const dbName = 'Eervami';
        const connectionString = `postgressql://${dbUser}:${dbPassword}@${dbIp}:${dbPort}/${dbName}`;

        this.client = new Client({
            connectionString: connectionString,
        });

        this.pool = new Pool({
            user: dbUser,
            password: dbPassword,
            host: dbIp,
            port: dbPort,
            database: dbName,
        });
    }

    public async executeSelectConsult(select_consult: string, values: any): Promise<any> {
        try {
            const queryResponse = await this.pool.query(select_consult, values);

            return queryResponse.rows;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    public async executeInsertConsult(insert_consult: string, values: any): Promise<any> {
        try {
            return await this.pool.query(insert_consult, values);
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    public async executeDeleteConsult(delete_consult: string, values: any): Promise<any> {
        try {
            return await this.pool.query(delete_consult, values);
        } catch (error) {
            console.log(error);

            throw error;
        }
    }
}
