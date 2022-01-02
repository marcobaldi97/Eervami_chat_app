import { action, makeAutoObservable, observable } from "mobx";


export class DataStore {
    static instance: DataStore;

    private constructor() {
        this.loggedUser = "";
        this.selectedFriend = undefined;

        makeAutoObservable(this);
    }

    public static getInstance(): DataStore {
        !DataStore.instance && (DataStore.instance = new DataStore());

        return DataStore.instance;
    }

    //#region data
    @observable loggedUser: string = "";

    @observable selectedFriend: string | undefined = undefined;
    //#endregion data
    //#region getters
    public getloggedUser() { return this.loggedUser };
    //#endregion getters
    //#region setters
    @action
    setloggedUser(user: string) { this.loggedUser = user };

    @action
    setSelectedFriend(friend: string) { this.selectedFriend = friend; console.log(this.selectedFriend) };
    //#endregion getters
}