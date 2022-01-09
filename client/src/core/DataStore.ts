import { action, makeAutoObservable, observable } from "mobx";


export class DataStore {
    static instance: DataStore;

    private constructor() {
        this.loggedUser = sessionStorage.getItem("user") ?? "";
        this.selectedFriend = undefined;

        makeAutoObservable(this);
    }

    public static getInstance(): DataStore {
        !DataStore.instance && (DataStore.instance = new DataStore());

        return DataStore.instance;
    }

    //#region data
    @observable loggedUser: string | undefined = undefined;

    @observable token: string | undefined = undefined;

    @observable selectedFriend: string | undefined = undefined;
    //#endregion data
    //#region getters
    public getloggedUser(): string { return (this.loggedUser ? this.loggedUser : "") };
    //#endregion getters
    //#region setters
    @action
    setloggedUser(user: string, token: string) {
        this.loggedUser = user;
        this.token = token;
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("token", token);
    };

    @action
    setSelectedFriend(friend: string) { this.selectedFriend = friend; console.log(this.selectedFriend) };
    //#endregion getters
}