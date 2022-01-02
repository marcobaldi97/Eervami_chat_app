export class DataStore {
    //singleton
    private static instance: DataStore;

    private constructor() {
        this.loggedUsers = new Map<string, string>();
    }

    public static getInstance(): DataStore {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }

        return DataStore.instance;
    }

    //a map that contains the username and the ip of the user that is logged in
    private loggedUsers: Map<string, string> = new Map<string, string>();

    //a method that checks if a user is logged in
    public isLoggedIn(username: string): boolean {
        return this.loggedUsers.has(username);
    }

    //a method that checks if the ip of the user that is logged in is the same as the ip of the user that is trying to login
    public isSameIp(username: string, ip: string): boolean {
        if (this.loggedUsers.get(username) === ip) return true;
        else {
            this.loggedUsers.delete(username);

            return false;
        }
    }

    //a method that logs a user in
    public login(username: string, ip: string): void {
        this.loggedUsers.set(username, ip);
    }
}
