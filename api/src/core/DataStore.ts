import store2 from "store2";

export class DataStore {
    //singleton
    private static instance: DataStore;

    private constructor() {
        this.loggedUsers = new Map<string, { token: string, timeoutId: NodeJS.Timeout }>();
    }

    public static getInstance(): DataStore {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }

        return DataStore.instance;
    }

    //a map that contains the username and the token of the user that is logged in    
    private loggedUsers: Map<string, { token: string, timeoutId: NodeJS.Timeout }>;

    //a method that checks if a user is logged in
    public isLoggedIn(username: string): boolean {
        return this.loggedUsers.has(username);
    }

    public validToken(username: string, token: string): boolean {
        return this.loggedUsers.get(username).token === token;
    }

    //a method that logs a user in
    public login(username: string, token: string): void {
        this.loggedUsers.set(username, { token: token, timeoutId: undefined });

        const timeoutID: NodeJS.Timeout = setInterval(() => {
            this.loggedUsers.delete(username);
        }, 1000 * 60 * 5); //5 minutes timeout.        

        this.loggedUsers.get(username).timeoutId = timeoutID;
    }

    public refresh(username: string): void {
        this.loggedUsers.get(username).timeoutId.refresh();
    }
}
