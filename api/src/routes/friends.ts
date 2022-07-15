import { Router } from "express";
import { DBManager } from "../core/DBManager";

export const friends = Router();

const db = DBManager.getInstance();

friends.get("/getFriendsList?", async (req, res, next) => {
    const { user, token } = req.query;
    try {
        let query = "SELECT * FROM friends WHERE user1=$1 OR user2=$1";
        const friendsQueryResult = await db.executeSelectConsult(query, [user]);

        const friendList = [];

        //query that search the last message of each friends   
        query =
            "SELECT * FROM messages " +
            "WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1) " +
            "ORDER BY msg_id DESC LIMIT 1";

        for (let i = 0; i < friendsQueryResult.length; i++) {
            const friend = friendsQueryResult[i];
            const friendName = user === friend.user2 ? friend.user1 : friend.user2;

            const queryResult = await db.executeSelectConsult(query, [user, friendName]);

            friendList.push({
                name: friendName,
                onlineStatus: true,
                lastMessage:
                    queryResult
                        && queryResult.length > 0
                        && Object.keys(queryResult).includes("msg") ? queryResult[0].msg : "",
            });
        }

        res.send(friendList);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
