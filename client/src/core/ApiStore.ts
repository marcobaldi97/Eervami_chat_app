import axios, { AxiosInstance } from "axios";
import { FriendStatus } from "../pages/Home/Home";

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
            console.log("Response data: ", response.data);
            return response.data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }
}