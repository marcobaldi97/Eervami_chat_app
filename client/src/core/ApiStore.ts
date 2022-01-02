import axios, { AxiosInstance } from "axios";

export interface Message {
    user1: string;
    user2: string;
    msg: string;
    msg_id: string;
    date_time: string | null;
}

export class ApiStore {
    axios: AxiosInstance;

    constructor() {
        const axiosConfig = {
            baseURL: 'http://localhost:5000/api',
            timeout: 30000,
        };

        this.axios = axios.create(axiosConfig);
    }

    //a GET request to the server to get every friend of a given username 
    public async getFriends(username: string): Promise<any> {
        try {
            const response = await this.axios.get(`/friends/getFriendsList?user=${username}`);

            return response.data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }

    //an Axios Get Request that given a pair of users, it gets all the messages between them
    public async getMessages(user1: string, user2: string): Promise<Message[]> {
        try {
            const response = await this.axios.get(`/messages/getMessages?user1=${user1}&user2=${user2}`);

            return Array.from(response.data);
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    //an Axios Post Request that given a pair of users and a message, it sends the message to the server
    public async sendMessage(user1: string, user2: string, msg: string): Promise<boolean> {
        try {
            const response = await this.axios.post(`/messages/sendMessage?user1=${user1}&user2=${user2}&msg=${msg}`);
            console.log("Response data: ", response.data);
            return response.data;
        } catch (error) {
            console.log(error);

            return false;
        }
    }
}