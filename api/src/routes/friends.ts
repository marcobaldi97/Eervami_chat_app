import { Router } from "express";
import { DBManager } from "../core/DBManager";

export const friends = Router();

const db = DBManager.getInstance();

friends.get("/getFriendsList?", async (req, res, next) => {
    const user = req.query.user;
    try {
        const query = "SELECT * FROM friends WHERE user1=$1 OR user2=$1";
        const queryResult = await db.executeSelectConsult(query, [user]);

        const friendList = queryResult.map((result: { user1: string, user2: string }) => {
            return {
                name: result.user1 === user ? result.user2 : result.user1,
                onlineStatus: true,
            }; //todo: change this when sockets.io is implemented
        });

        res.send(friendList);
    } catch (error) {
        console.log(error);

        res.send(error);
    }

});
