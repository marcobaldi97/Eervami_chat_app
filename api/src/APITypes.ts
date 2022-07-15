export type LoginParams = {
    username: string;
    password: string;
};

export type GetFriendsListParams = {
    user: string;
    token: string;
};

export type LastMessageParams = {
    user1: string;
    user2: string;
    token: string;
};

export type GetMessagesParams = {
    user1: string;
    user2: string;
    token: string;
};

export type SendMessageParams = {
    user1: string;
    user2: string;
    msg: string;
    token: string;
};