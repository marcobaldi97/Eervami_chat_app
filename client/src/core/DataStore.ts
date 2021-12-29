export class DataStore {
    static instance: DataStore;

    public static getInstance(): DataStore {
        !DataStore.instance && (DataStore.instance = new DataStore());

        return DataStore.instance;
    }

    //data
    private loggedUser = ""
    //data

    public setloggedUser(user: string) { this.loggedUser = user };

    public getloggedUser() { return this.loggedUser };
}