import axios, { AxiosInstance } from "axios";
import { Message } from "../types";
import { DataStore } from "./DataStore";
export class ApiStore {
    axios: AxiosInstance;
    dataStore: DataStore;

    constructor() {
        const axiosConfig = {
            baseURL: 'http://localhost:5000/api',
            timeout: 30000,
        };

        this.axios = axios.create(axiosConfig);

        this.dataStore = DataStore.getInstance();
    }

    public async getFriends(username: string | undefined): Promise<any> {
        if (!username) return;
        try {
            console.log(this.dataStore.token)
            const response = await this.axios.get(`/friends/getFriendsList?user=${username}&token=${this.dataStore.token}`);

            return response.data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }

    public async getMessages(user1: string, user2: string): Promise<Message[]> {
        try {
            const response = await this.axios.get(`/messages/getMessages?user1=${user1}&user2=${user2}&token=${this.dataStore.token}`);

            console.log(response.data);


            return Array.from(response.data);
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    public async sendMessage(user1: string, user2: string, msg: string): Promise<boolean> {
        try {
            const response = await this.axios.post(`/messages/sendMessage?user1=${user1}&user2=${user2}&msg=${msg}&token=${this.dataStore.token}`);
            console.log("Response data: ", response.data);
            return response.data;
        } catch (error) {
            console.log(error);

            return false;
        }
    }

    public async getLastMessage(user1: string, user2: string): Promise<Message | undefined> {
        try {
            const response = await this.axios.get(`/messages/lastMessage?user1=${user1}&user2=${user2}&token=${this.dataStore.token}`);

            return response.data;
        } catch (error) {
            console.log(error);

            return undefined;
        }
    }

    public async login(username: string, password: string): Promise<boolean> {
        try {
            const response = await this.axios.post(`/users/login`, { username: username, password: password });

            if (response.data.success) {
                this.dataStore.setloggedUser(username, response.data.token);

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);

            return false;
        }
    }
}