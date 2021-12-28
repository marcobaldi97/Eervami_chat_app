import axios, { AxiosInstance } from "axios";

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
            alert(`/friends/getFriendsList?user=${username}`);
            const response = await this.axios.get(`/friends/getFriendsList?user=${username}`);

            return response.data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }

    //a GET request that given a username and a friend username, will return the last message between the two users
    public async getLastMessage(username: string, friendUsername: string): Promise<any> {
        try {
            const response = await this.axios.get(`/messages/lastMessage?user1=${username}&user2=${friendUsername}`);

            return response.data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }
}